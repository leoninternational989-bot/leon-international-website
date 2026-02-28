'use client';

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
  body_text: string | null;
  body_html: string | null;
  created_at: string;
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

export default function MessageBubble({ message }: { message: Message }) {
  const isOutbound = message.direction === 'outbound';

  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] ${isOutbound ? 'order-1' : 'order-1'}`}>
        {/* Sender name for inbound */}
        {!isOutbound && (
          <p className="text-[11px] font-medium text-gray-500 mb-1 ml-1">
            {message.sender_name || message.sender_email}
          </p>
        )}

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

        {/* Timestamp */}
        <p className={`text-[10px] text-gray-400 mt-1 ${isOutbound ? 'text-right mr-1' : 'ml-1'}`}>
          {formatTime(message.created_at)}
        </p>
      </div>
    </div>
  );
}
