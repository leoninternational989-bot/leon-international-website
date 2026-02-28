'use client';

import { useState } from 'react';
import { X, Forward, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ForwardMessageModalProps {
  open: boolean;
  onClose: () => void;
  messageId: string;
  originalSubject: string | null;
  originalSender: string;
  originalPreview: string | null;
  onForwarded?: (conversationId: string) => void;
}

export default function ForwardMessageModal({
  open,
  onClose,
  messageId,
  originalSubject,
  originalSender,
  originalPreview,
  onForwarded,
}: ForwardMessageModalProps) {
  const [forwardTo, setForwardTo] = useState('');
  const [sending, setSending] = useState(false);

  if (!open) return null;

  async function handleForward() {
    if (!forwardTo.trim()) {
      toast.error('Please enter a recipient email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forwardTo.trim())) {
      toast.error('Invalid email address');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/admin/emails/forward', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, forwardTo: forwardTo.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success('Message forwarded successfully');
      setForwardTo('');
      onClose();
      onForwarded?.(data.conversationId);
    } catch (err: any) {
      toast.error(err.message || 'Failed to forward');
    } finally {
      setSending(false);
    }
  }

  // Truncate preview text
  const preview = originalPreview
    ? originalPreview.substring(0, 200) + (originalPreview.length > 200 ? '...' : '')
    : 'No content';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <Forward className="h-4 w-4" />
            Forward Message
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Original message preview */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
          <p className="text-[11px] font-medium text-gray-500 mb-1">Original message</p>
          <p className="text-xs font-medium text-gray-700 truncate">
            {originalSubject || '(no subject)'}
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">From: {originalSender}</p>
          <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{preview}</p>
        </div>

        {/* Forward to input */}
        <div className="px-5 py-4">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Forward to</label>
          <input
            type="email"
            value={forwardTo}
            onChange={(e) => setForwardTo(e.target.value)}
            placeholder="recipient@example.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1]"
            onKeyDown={(e) => { if (e.key === 'Enter') handleForward(); }}
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={sending}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleForward}
            disabled={sending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#2E86C1] hover:bg-[#2574A9] rounded-lg disabled:opacity-50 transition-colors"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Forward className="h-4 w-4" />
            )}
            Forward
          </button>
        </div>
      </div>
    </div>
  );
}
