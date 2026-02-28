'use client';

import { useState } from 'react';
import { Search, Paperclip, Mail } from 'lucide-react';

interface Conversation {
  id: string;
  alias_id: string;
  external_email: string;
  external_name: string | null;
  subject: string | null;
  status: string;
  last_message_at: string;
  unread_count: number;
  source: string;
  email_aliases?: { alias_email: string; display_name: string } | null;
}

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  statusFilter: string;
  onStatusFilterChange: (s: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
  loading: boolean;
}

const STATUSES = ['all', 'open', 'assigned', 'resolved', 'closed'];

function formatRelativeTime(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getInitials(name: string | null, email: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
  return email.substring(0, 2).toUpperCase();
}

const SOURCE_COLORS: Record<string, string> = {
  email: 'bg-blue-100 text-blue-600',
  contact_form: 'bg-green-100 text-green-600',
  quote_form: 'bg-purple-100 text-purple-600',
};

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
  statusFilter,
  onStatusFilterChange,
  search,
  onSearchChange,
  loading,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Search */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors"
            placeholder="Search conversations..."
          />
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-1 px-3 py-2 border-b border-gray-100 overflow-x-auto">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onStatusFilterChange(s)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium capitalize whitespace-nowrap transition-colors ${
              statusFilter === s
                ? 'bg-[#0E2F44] text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="px-4 py-3 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="h-3.5 bg-gray-200 rounded w-28" />
                      <div className="h-2.5 bg-gray-100 rounded w-8" />
                    </div>
                    <div className="h-3 bg-gray-100 rounded w-40" />
                    <div className="h-2.5 bg-gray-50 rounded w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Mail className="h-8 w-8 mb-2" />
            <p className="text-sm">No conversations</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedId === conv.id ? 'bg-blue-50/60 border-l-2 border-l-[#2E86C1]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-[#0E2F44] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                  {getInitials(conv.external_name, conv.external_email)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm truncate ${conv.unread_count > 0 ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {conv.external_name || conv.external_email}
                    </p>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {formatRelativeTime(conv.last_message_at)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {conv.subject || conv.external_email}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {conv.email_aliases && (
                      <span className="text-[10px] text-gray-400 truncate">
                        {conv.email_aliases.alias_email}
                      </span>
                    )}
                    {conv.unread_count > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E67E22] text-white text-[10px] font-bold">
                        {conv.unread_count > 9 ? '9+' : conv.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
