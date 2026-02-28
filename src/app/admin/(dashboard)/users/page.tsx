'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { toast } from 'sonner';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import {
  UserPlus,
  Pencil,
  KeyRound,
  UserX,
  UserCheck,
  Loader2,
  Users,
  Shield,
  Mail,
  Plus,
  Trash2,
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Modal from '@/components/admin/Modal';
import UserForm from '@/components/admin/UserForm';

interface CrmUserRow {
  id: string;
  full_name: string;
  email: string;
  role: string;
  email_alias_id: string | null;
  alias_email: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
  email_aliases?: { alias_email: string; display_name: string } | null;
}

interface Alias {
  id: string;
  alias_email: string;
  display_name: string;
  is_active?: boolean;
}

const ROLE_COLORS: Record<string, string> = {
  super_admin: 'bg-purple-100 text-purple-700',
  admin: 'bg-blue-100 text-blue-700',
  sales: 'bg-green-100 text-green-700',
  support: 'bg-orange-100 text-orange-700',
};

export default function UsersPage() {
  const { user: currentUser, isSuperAdmin, loading: userLoading } = useUser();
  const router = useRouter();

  const [users, setUsers] = useState<CrmUserRow[]>([]);
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showCreate, setShowCreate] = useState(false);
  const [editUser, setEditUser] = useState<CrmUserRow | null>(null);
  const [resetUser, setResetUser] = useState<CrmUserRow | null>(null);
  const [toggleUser, setToggleUser] = useState<CrmUserRow | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetting, setResetting] = useState(false);
  const [toggling, setToggling] = useState(false);

  // Alias management
  const [allAliases, setAllAliases] = useState<Alias[]>([]);
  const [showAddAlias, setShowAddAlias] = useState(false);
  const [newAliasEmail, setNewAliasEmail] = useState('');
  const [newAliasName, setNewAliasName] = useState('');
  const [savingAlias, setSavingAlias] = useState(false);
  const [deleteAlias, setDeleteAlias] = useState<Alias | null>(null);
  const [deletingAlias, setDeletingAlias] = useState(false);

  // Redirect non-super_admin
  useEffect(() => {
    if (!userLoading && !isSuperAdmin) {
      router.push('/admin');
    }
  }, [userLoading, isSuperAdmin, router]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUsers(data);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAliases = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('email_aliases')
      .select('id, alias_email, display_name, is_active')
      .order('alias_email');
    setAllAliases(data || []);
    setAliases((data || []).filter((a: Alias) => a.is_active !== false));
  }, []);

  useEffect(() => {
    if (isSuperAdmin) {
      fetchUsers();
      fetchAliases();
    }
  }, [isSuperAdmin, fetchUsers, fetchAliases]);

  async function handleCreate(data: any) {
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    toast.success('User created successfully');
    setShowCreate(false);
    fetchUsers();
  }

  async function handleEdit(data: any) {
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error);
    toast.success('User updated successfully');
    setEditUser(null);
    fetchUsers();
  }

  async function handleResetPassword() {
    if (!resetUser || newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setResetting(true);
    try {
      const res = await fetch('/api/admin/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: resetUser.id, newPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      toast.success('Password reset successfully');
      setResetUser(null);
      setNewPassword('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password');
    } finally {
      setResetting(false);
    }
  }

  async function handleToggleActive() {
    if (!toggleUser) return;
    setToggling(true);
    try {
      const endpoint = toggleUser.is_active ? '/api/admin/users' : '/api/admin/users';
      const method = toggleUser.is_active ? 'DELETE' : 'PATCH';
      const body = toggleUser.is_active
        ? { id: toggleUser.id }
        : { id: toggleUser.id, is_active: true };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      toast.success(toggleUser.is_active ? 'User deactivated' : 'User reactivated');
      setToggleUser(null);
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update user status');
    } finally {
      setToggling(false);
    }
  }

  async function handleAddAlias() {
    if (!newAliasEmail.trim() || !newAliasName.trim()) {
      toast.error('Both email and display name are required');
      return;
    }
    setSavingAlias(true);
    try {
      const res = await fetch('/api/admin/aliases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias_email: newAliasEmail, display_name: newAliasName }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast.success('Alias added successfully');
      setShowAddAlias(false);
      setNewAliasEmail('');
      setNewAliasName('');
      fetchAliases();
    } catch (err: any) {
      toast.error(err.message || 'Failed to add alias');
    } finally {
      setSavingAlias(false);
    }
  }

  async function handleDeleteAlias() {
    if (!deleteAlias) return;
    setDeletingAlias(true);
    try {
      const res = await fetch('/api/admin/aliases', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteAlias.id }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast.success('Alias deleted');
      setDeleteAlias(null);
      fetchAliases();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete alias');
    } finally {
      setDeletingAlias(false);
    }
  }

  if (userLoading || !isSuperAdmin) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-gray-200 border-t-[#E67E22] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-400" />
          <h2 className="text-sm font-medium text-gray-500">
            {users.length} user{users.length !== 1 ? 's' : ''}
          </h2>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0E2F44] rounded-lg hover:bg-[#1A5276] transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Alias</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    <div className="w-6 h-6 border-2 border-gray-200 border-t-[#E67E22] rounded-full animate-spin mx-auto" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400 text-sm">No users found</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${u.is_active ? 'bg-[#0E2F44]' : 'bg-gray-300'}`}>
                          {u.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{u.full_name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 hidden md:table-cell">{u.email}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[u.role] || 'bg-gray-100 text-gray-600'}`}>
                        {u.role === 'super_admin' && <Shield className="h-3 w-3" />}
                        {u.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs hidden lg:table-cell">
                      {u.alias_email || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {u.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditUser(u)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => { setResetUser(u); setNewPassword(''); }}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                          title="Reset Password"
                        >
                          <KeyRound className="h-4 w-4" />
                        </button>
                        {u.id !== currentUser?.id && (
                          <button
                            onClick={() => setToggleUser(u)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              u.is_active
                                ? 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
                            }`}
                            title={u.is_active ? 'Deactivate' : 'Reactivate'}
                          >
                            {u.is_active ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create New User">
        <UserForm
          mode="create"
          aliases={aliases}
          onSubmit={handleCreate}
          onCancel={() => setShowCreate(false)}
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal open={!!editUser} onClose={() => setEditUser(null)} title="Edit User">
        {editUser && (
          <UserForm
            mode="edit"
            initialData={{
              id: editUser.id,
              full_name: editUser.full_name,
              email: editUser.email,
              role: editUser.role,
              email_alias_id: editUser.email_alias_id,
              is_active: editUser.is_active,
            }}
            aliases={aliases}
            onSubmit={handleEdit}
            onCancel={() => setEditUser(null)}
          />
        )}
      </Modal>

      {/* Reset Password Modal */}
      <Modal open={!!resetUser} onClose={() => setResetUser(null)} title="Reset Password">
        {resetUser && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Set a new password for <strong className="text-gray-800">{resetUser.full_name}</strong> ({resetUser.email})
            </p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
                placeholder="Min 6 characters"
              />
            </div>
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setResetUser(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={resetting || newPassword.length < 6}
                className="px-4 py-2.5 text-sm font-medium text-white bg-[#E67E22] rounded-lg hover:bg-[#CA6F1E] disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {resetting && <Loader2 className="h-4 w-4 animate-spin" />}
                Reset Password
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toggle Active Modal */}
      <Modal open={!!toggleUser} onClose={() => setToggleUser(null)} title={toggleUser?.is_active ? 'Deactivate User' : 'Reactivate User'}>
        {toggleUser && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              {toggleUser.is_active ? (
                <>Are you sure you want to deactivate <strong className="text-gray-800">{toggleUser.full_name}</strong>? They will lose access to the CRM.</>
              ) : (
                <>Reactivate <strong className="text-gray-800">{toggleUser.full_name}</strong>? They will regain access to the CRM.</>
              )}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setToggleUser(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleToggleActive}
                disabled={toggling}
                className={`px-4 py-2.5 text-sm font-medium text-white rounded-lg disabled:opacity-50 transition-colors flex items-center gap-2 ${
                  toggleUser.is_active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {toggling && <Loader2 className="h-4 w-4 animate-spin" />}
                {toggleUser.is_active ? 'Deactivate' : 'Reactivate'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* ─── Email Aliases Section ─── */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-400" />
            <h2 className="text-sm font-medium text-gray-500">
              {allAliases.length} email alias{allAliases.length !== 1 ? 'es' : ''}
            </h2>
          </div>
          <button
            onClick={() => { setShowAddAlias(true); setNewAliasEmail(''); setNewAliasName(''); }}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0E2F44] rounded-lg hover:bg-[#1A5276] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Alias
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Alias Email</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Display Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allAliases.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-400 text-sm">No aliases configured</td>
                  </tr>
                ) : (
                  allAliases.map((a) => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-[#2E86C1]" />
                          <span className="font-medium text-gray-800">{a.alias_email}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{a.display_name}</td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${a.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {a.is_active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => setDeleteAlias(a)}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Alias Modal */}
      <Modal open={showAddAlias} onClose={() => setShowAddAlias(false)} title="Add Email Alias">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Alias Email</label>
            <input
              type="email"
              value={newAliasEmail}
              onChange={(e) => setNewAliasEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
              placeholder="e.g. newteam@leon-international.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Name</label>
            <input
              type="text"
              value={newAliasName}
              onChange={(e) => setNewAliasName(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
              placeholder="e.g. Leon New Team"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={() => setShowAddAlias(false)}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAlias}
              disabled={savingAlias || !newAliasEmail.trim() || !newAliasName.trim()}
              className="px-4 py-2.5 text-sm font-medium text-white bg-[#0E2F44] rounded-lg hover:bg-[#1A5276] disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {savingAlias && <Loader2 className="h-4 w-4 animate-spin" />}
              Add Alias
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Alias Modal */}
      <Modal open={!!deleteAlias} onClose={() => setDeleteAlias(null)} title="Delete Alias">
        {deleteAlias && (
          <div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete <strong className="text-gray-800">{deleteAlias.alias_email}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteAlias(null)}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAlias}
                disabled={deletingAlias}
                className="px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {deletingAlias && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
