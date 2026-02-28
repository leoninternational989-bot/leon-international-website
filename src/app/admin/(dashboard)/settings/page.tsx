'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';
import { Lock, Loader2, User, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { user: crmUser } = useUser();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const displayName = crmUser?.full_name || 'Admin';
  const displayEmail = crmUser?.email || '';
  const displayInitial = displayName.charAt(0).toUpperCase();
  const roleLabel = crmUser?.role?.replace('_', ' ') || '';

  async function handleChangePassword() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    const supabase = createClient();

    // Verify current password by re-authenticating
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: displayEmail,
      password: currentPassword,
    });

    if (signInError) {
      toast.error('Current password is incorrect');
      setSaving(false);
      return;
    }

    // Update password
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSaving(false);

    if (error) {
      toast.error('Failed to update password');
    } else {
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <User className="h-4 w-4 text-gray-400" />
            Profile
          </h3>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0E2F44] flex items-center justify-center text-white text-xl font-bold">
              {displayInitial}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{displayName}</p>
              <p className="text-sm text-gray-500">{displayEmail}</p>
              {roleLabel && (
                <p className="text-xs text-gray-400 capitalize mt-0.5">{roleLabel}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
            <Shield className="h-4 w-4 text-gray-400" />
            Change Password
          </h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
                placeholder="Enter current password"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={saving}
            className="bg-[#0E2F44] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#1A5276] disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}
