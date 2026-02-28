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

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const { user } = useUser();
  const title = pageTitles[pathname] || 'Admin';

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
        <h1 className="text-lg font-semibold text-gray-800 font-plus-jakarta-sans">{title}</h1>
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
