'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useUser } from '@/contexts/UserContext';
import { RefreshCw, Loader2, Inbox as InboxIcon, Plus } from 'lucide-react';
import { toast } from 'sonner';
import ConversationList from '@/components/admin/ConversationList';
import ConversationThread from '@/components/admin/ConversationThread';
import ComposeEmailModal from '@/components/admin/ComposeEmailModal';

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

interface Alias {
  id: string;
  alias_email: string;
  display_name: string;
}

export default function InboxPage() {
  const { user, isSuperAdmin } = useUser();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [aliases, setAliases] = useState<Alias[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [aliasFilter, setAliasFilter] = useState('all');
  const [composeOpen, setComposeOpen] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Debounce search input
  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [search]);

  const fetchAliases = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('email_aliases')
      .select('id, alias_email, display_name')
      .eq('is_active', true)
      .order('alias_email');
    setAliases(data || []);
  }, []);

  const fetchConversations = useCallback(async () => {
    const supabase = createClient();
    let query = supabase
      .from('conversations')
      .select('*, email_aliases(alias_email, display_name)')
      .eq('is_deleted', false)
      .order('last_message_at', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    if (debouncedSearch.trim()) {
      query = query.or(
        `external_email.ilike.%${debouncedSearch.trim()}%,external_name.ilike.%${debouncedSearch.trim()}%,subject.ilike.%${debouncedSearch.trim()}%`
      );
    }

    // Alias filter: super admin can filter by any alias; non-admin sees only their alias
    if (isSuperAdmin && aliasFilter !== 'all') {
      query = query.eq('alias_id', aliasFilter);
    } else if (!isSuperAdmin && user?.email_alias_id) {
      query = query.eq('alias_id', user.email_alias_id);
    }

    const { data } = await query;
    setConversations(data || []);
    setLoading(false);
  }, [statusFilter, debouncedSearch, aliasFilter, isSuperAdmin, user?.email_alias_id]);

  useEffect(() => {
    fetchAliases();
  }, [fetchAliases]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Realtime: new conversations and updates
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('inbox-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'conversations' },
        () => fetchConversations()
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'conversations' },
        () => fetchConversations()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  // Background polling every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('/api/admin/emails/sync', { method: 'POST' });
        if (res.ok) {
          setLastSyncedAt(new Date());
        }
      } catch {
        // Silent — no toast on background poll
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  async function handleSync() {
    setSyncing(true);
    try {
      const res = await fetch('/api/admin/emails/sync', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Synced ${data.fetched} emails, ${data.created} new`);
        setLastSyncedAt(new Date());
        fetchConversations();
      } else {
        toast.error(data.error || 'Sync failed');
      }
    } catch {
      toast.error('Sync failed');
    } finally {
      setSyncing(false);
    }
  }

  function formatLastSynced(): string {
    if (!lastSyncedAt) return '';
    const diff = Math.floor((Date.now() - lastSyncedAt.getTime()) / 1000);
    if (diff < 10) return 'just now';
    if (diff < 60) return `${diff}s ago`;
    const mins = Math.floor(diff / 60);
    return `${mins}m ago`;
  }

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <InboxIcon className="h-4 w-4" />
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </h2>

          {/* Alias filter (super admin only) */}
          {isSuperAdmin && aliases.length > 0 && (
            <select
              value={aliasFilter}
              onChange={(e) => { setAliasFilter(e.target.value); setSelectedId(null); }}
              className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20"
            >
              <option value="all">All Aliases</option>
              {aliases.map((a) => (
                <option key={a.id} value={a.id}>{a.display_name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          {lastSyncedAt && (
            <span className="text-[10px] text-gray-400 hidden sm:inline">
              Synced {formatLastSynced()}
            </span>
          )}
          <button
            onClick={() => setComposeOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-[#E67E22] hover:bg-[#CA6F1E] rounded-lg transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            New Email
          </button>
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {syncing ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Sync Now
          </button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="flex-1 flex rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white min-h-0">
        {/* Left: Conversation list */}
        <div className={`w-full lg:min-w-[360px] lg:max-w-[360px] shrink-0 ${selectedId ? 'hidden lg:flex lg:flex-col' : 'flex flex-col'}`}>
          <ConversationList
            conversations={conversations}
            selectedId={selectedId}
            onSelect={setSelectedId}
            statusFilter={statusFilter}
            onStatusFilterChange={(s) => { setStatusFilter(s); setSelectedId(null); }}
            search={search}
            onSearchChange={setSearch}
            loading={loading}
          />
        </div>

        {/* Right: Thread or empty state */}
        <div className={`flex-1 min-w-0 ${selectedId ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}`}>
          {selectedId ? (
            <ConversationThread
              conversationId={selectedId}
              onBack={() => setSelectedId(null)}
              onRead={() => fetchConversations()}
              onDeleted={() => {
                setSelectedId(null);
                fetchConversations();
              }}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <InboxIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Select a conversation to view messages</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose modal — non-admin sees only their assigned alias */}
      <ComposeEmailModal
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        aliases={
          isSuperAdmin
            ? aliases
            : aliases.filter((a) => a.id === user?.email_alias_id)
        }
        onSent={(conversationId) => {
          fetchConversations();
          setSelectedId(conversationId);
        }}
      />
    </div>
  );
}
