'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useUser } from '@/contexts/UserContext';
import { ArrowLeft, RefreshCw, ChevronDown, Loader2 } from 'lucide-react';
import MessageBubble, { DateDivider } from './MessageBubble';
import ReplyComposer from './ReplyComposer';

interface Attachment {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
}

interface Message {
  id: string;
  direction: 'inbound' | 'outbound';
  sender_email: string;
  sender_name: string | null;
  body_text: string | null;
  body_html: string | null;
  created_at: string;
  is_read: boolean;
  attachments?: Attachment[];
}

interface Conversation {
  id: string;
  external_email: string;
  external_name: string | null;
  subject: string | null;
  status: string;
  assigned_to: string | null;
  email_aliases?: { alias_email: string; display_name: string } | null;
}

interface ConversationThreadProps {
  conversationId: string;
  onBack: () => void;
  onRead?: () => void;
}

const STATUS_OPTIONS = ['open', 'assigned', 'resolved', 'closed'];

export default function ConversationThread({ conversationId, onBack, onRead }: ConversationThreadProps) {
  const { user } = useUser();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  async function fetchConversation() {
    const supabase = createClient();
    const { data } = await supabase
      .from('conversations')
      .select('*, email_aliases(alias_email, display_name)')
      .eq('id', conversationId)
      .single();
    setConversation(data);
  }

  async function fetchMessages() {
    const supabase = createClient();
    const { data } = await supabase
      .from('messages')
      .select('*, attachments(*)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    setMessages(data || []);
    setLoading(false);

    // Mark unread messages as read
    if (data?.some((m: Message) => !m.is_read && m.direction === 'inbound')) {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .eq('is_read', false);

      await supabase
        .from('conversations')
        .update({ unread_count: 0 })
        .eq('id', conversationId);

      // Notify parent to refresh conversation list (clears badge)
      onRead?.();
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchConversation();
    fetchMessages();
  }, [conversationId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Realtime subscription for new messages
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`thread-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          // Fetch the full message with attachments
          const { data } = await supabase
            .from('messages')
            .select('*, attachments(*)')
            .eq('id', payload.new.id)
            .single();

          if (data) {
            setMessages((prev) => {
              if (prev.some((m) => m.id === data.id)) return prev;
              return [...prev, data];
            });

            // Auto-mark inbound as read
            if (data.direction === 'inbound') {
              await supabase
                .from('messages')
                .update({ is_read: true })
                .eq('id', data.id);

              await supabase
                .from('conversations')
                .update({ unread_count: 0 })
                .eq('id', conversationId);

              onRead?.();
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  async function handleStatusChange(status: string) {
    setUpdatingStatus(true);
    const supabase = createClient();
    await supabase
      .from('conversations')
      .update({ status })
      .eq('id', conversationId);
    setConversation((prev) => prev ? { ...prev, status } : prev);
    setUpdatingStatus(false);
  }

  // Group messages by date for date dividers
  function getDateKey(date: string): string {
    return new Date(date).toDateString();
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-gray-50 animate-pulse">
        {/* Skeleton header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 bg-gray-200 rounded w-36" />
            <div className="h-3 bg-gray-100 rounded w-48" />
          </div>
          <div className="h-7 bg-gray-100 rounded-lg w-20" />
        </div>
        {/* Skeleton messages */}
        <div className="flex-1 px-4 py-4 space-y-4">
          {[false, true, false, true].map((isRight, i) => (
            <div key={i} className={`flex ${isRight ? 'justify-end' : 'justify-start'}`}>
              <div className={`space-y-2 ${isRight ? 'items-end' : 'items-start'}`}>
                <div className={`h-16 bg-gray-200 rounded-2xl ${isRight ? 'w-52' : 'w-64'}`} />
                <div className="h-2 bg-gray-100 rounded w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  let lastDateKey = '';

  return (
    <div className="flex flex-col h-full bg-gray-50 min-w-0 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {conversation?.external_name || conversation?.external_email}
            </h3>
            {conversation?.email_aliases && (
              <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full shrink-0">
                {conversation.email_aliases.alias_email}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">
            {conversation?.subject || conversation?.external_email}
          </p>
        </div>

        {/* Status dropdown */}
        <select
          value={conversation?.status || 'open'}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={updatingStatus}
          className="text-xs font-medium border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 capitalize"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={() => fetchMessages()}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => {
            const dateKey = getDateKey(msg.created_at);
            const showDate = dateKey !== lastDateKey;
            lastDateKey = dateKey;
            return (
              <div key={msg.id}>
                {showDate && <DateDivider date={msg.created_at} />}
                <MessageBubble message={msg} />
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Reply composer */}
      <ReplyComposer
        conversationId={conversationId}
        onSent={() => {
          fetchMessages();
          fetchConversation();
        }}
      />
    </div>
  );
}
