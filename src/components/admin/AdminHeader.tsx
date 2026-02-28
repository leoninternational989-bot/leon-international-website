'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import NotificationBell from './NotificationBell';
import { useUser } from '@/contexts/UserContext';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/inbox': 'Inbox',
  '/admin/contacts': 'Contact Inquiries',
  '/admin/quotations': 'Quotation Requests',
  '/admin/users': 'User Management',
  '/admin/settings': 'Settings',
};

// Map alias emails to panel names
function getPanelName(role?: string, aliasEmail?: string): string {
  if (role === 'super_admin') return 'Admin Panel';
  if (!aliasEmail) return 'Admin Panel';

  const prefix = aliasEmail.split('@')[0]?.toLowerCase();
  switch (prefix) {
    case 'sale': return 'Sales Panel';
    case 'support': return 'Support Panel';
    case 'info': return 'Info Panel';
    case 'admin': return 'Admin Panel';
    default: {
      // Capitalize first letter for custom aliases (e.g., "hassan" → "Hassan Panel")
      const name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      return `${name} Panel`;
    }
  }
}

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const title = pageTitles[pathname] || 'Admin';
  const panelName = getPanelName(user?.role, user?.alias_email ?? undefined);

  const initial = user?.full_name?.charAt(0)?.toUpperCase() || 'A';
  const displayName = user?.full_name || 'Admin';
  const roleLabel = user?.role?.replace('_', ' ') || '';

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-800 font-plus-jakarta-sans">{title}</h1>
          <span className="hidden sm:inline-flex text-[10px] font-medium bg-[#0E2F44]/10 text-[#0E2F44] px-2 py-0.5 rounded-full">
            {panelName}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#0E2F44] flex items-center justify-center text-white text-xs font-bold">
            {initial}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-700 leading-tight">{displayName}</span>
            {roleLabel && (
              <span className="text-[10px] text-gray-400 capitalize leading-tight">{roleLabel}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
