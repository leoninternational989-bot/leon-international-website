'use client';

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface Alias {
  id: string;
  alias_email: string;
  display_name: string;
}

interface UserFormProps {
  mode: 'create' | 'edit';
  initialData?: {
    id?: string;
    full_name: string;
    email?: string;
    role: string;
    email_alias_id: string | null;
    is_active?: boolean;
  };
  aliases: Alias[];
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

const roles = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Support' },
];

export default function UserForm({ mode, initialData, aliases, onSubmit, onCancel }: UserFormProps) {
  const [fullName, setFullName] = useState(initialData?.full_name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialData?.role || 'sales');
  const [aliasId, setAliasId] = useState(initialData?.email_alias_id || '');
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.full_name);
      setEmail(initialData.email || '');
      setRole(initialData.role);
      setAliasId(initialData.email_alias_id || '');
      setIsActive(initialData.is_active ?? true);
    }
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) { setError('Name is required'); return; }
    if (mode === 'create' && !email.trim()) { setError('Email is required'); return; }
    if (mode === 'create' && password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setSaving(true);
    try {
      const data: any = {
        full_name: fullName.trim(),
        role,
        email_alias_id: aliasId || null,
      };

      if (mode === 'create') {
        data.email = email.trim();
        data.password = password;
      } else {
        data.id = initialData?.id;
        data.is_active = isActive;
      }

      await onSubmit(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  }

  const inputClass = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-100">
          {error}
        </div>
      )}

      <div>
        <label className={labelClass}>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
          placeholder="Enter full name"
        />
      </div>

      {mode === 'create' && (
        <>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="Min 6 characters"
            />
          </div>
        </>
      )}

      <div>
        <label className={labelClass}>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
        >
          {roles.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Email Alias</label>
        <select
          value={aliasId}
          onChange={(e) => setAliasId(e.target.value)}
          className={inputClass}
        >
          <option value="">No alias assigned</option>
          {aliases.map((a) => (
            <option key={a.id} value={a.id}>{a.display_name} ({a.alias_email})</option>
          ))}
        </select>
      </div>

      {mode === 'edit' && (
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
          </label>
          <span className="text-sm text-gray-700">Active</span>
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2.5 text-sm font-medium text-white bg-[#0E2F44] rounded-lg hover:bg-[#1A5276] disabled:opacity-50 transition-colors flex items-center gap-2"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === 'create' ? 'Create User' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
