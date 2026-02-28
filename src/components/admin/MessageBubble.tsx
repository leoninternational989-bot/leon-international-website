'use client';

import { useState, useRef, useEffect } from 'react';
import { Forward, Trash2, MoreVertical } from 'lucide-react';
import AttachmentPreview from './AttachmentPreview';
import MessageBody from './MessageBody';

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
  subject?: string | null;
  body_text: string | null;
  body_html: string | null;
  created_at: string;
  is_read?: boolean;
  attachments?: Attachment[];
}

function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function formatDate(date: string): string {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
        {formatDate(date)}
      </span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
  isSuperAdmin?: boolean;
  onForward?: (message: Message) => void;
  onDelete?: (messageId: string, deleteFromGmail: boolean) => void;
}

export default function MessageBubble({ message, isSuperAdmin, onForward, onDelete }: MessageBubbleProps) {
  const isOutbound = message.direction === 'outbound';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <div className={`group flex ${isOutbound ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] relative ${isOutbound ? 'order-1' : 'order-1'}`}>
        {/* Sender name for inbound */}
        {!isOutbound && (
          <p className="text-[11px] font-medium text-gray-500 mb-1 ml-1">
            {message.sender_name || message.sender_email}
          </p>
        )}

        <div className="relative">
          <div
            className={`rounded-2xl px-4 py-2.5 overflow-hidden ${
              isOutbound
                ? 'bg-[#0E2F44] text-white rounded-br-md'
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
            }`}
          >
            {/* Body */}
            <MessageBody
              html={message.body_html}
              text={message.body_text}
              isOutbound={isOutbound}
            />

            {/* Attachments */}
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {message.attachments.map((att) => (
                  <AttachmentPreview key={att.id} attachment={att} />
                ))}
              </div>
            )}
          </div>

          {/* Action menu button — appears on hover */}
          {(onForward || onDelete) && (
            <div
              ref={menuRef}
              className={`absolute top-1 ${isOutbound ? '-left-8' : '-right-8'} opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>

              {/* Dropdown menu */}
              {menuOpen && (
                <div
                  className={`absolute top-7 ${isOutbound ? 'left-0' : 'right-0'} bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[160px] z-10`}
                >
                  {onForward && (
                    <button
                      onClick={() => { setMenuOpen(false); onForward(message); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Forward className="h-3.5 w-3.5" />
                      Forward
                    </button>
                  )}
                  {onDelete && (
                    <>
                      <button
                        onClick={() => { setMenuOpen(false); onDelete(message.id, false); }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                      {isSuperAdmin && (
                        <button
                          onClick={() => { setMenuOpen(false); onDelete(message.id, true); }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete from Gmail
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-[10px] text-gray-400 mt-1 ${isOutbound ? 'text-right mr-1' : 'ml-1'}`}>
          {formatTime(message.created_at)}
        </p>
      </div>
    </div>
  );
}
