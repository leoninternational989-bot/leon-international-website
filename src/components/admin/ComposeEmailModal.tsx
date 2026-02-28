'use client';

import { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Alias {
  id: string;
  alias_email: string;
  display_name: string;
}

interface ComposeEmailModalProps {
  open: boolean;
  onClose: () => void;
  aliases: Alias[];
  onSent: (conversationId: string) => void;
}

export default function ComposeEmailModal({ open, onClose, aliases, onSent }: ComposeEmailModalProps) {
  const [fromAliasId, setFromAliasId] = useState('');

  // Sync fromAliasId when aliases change or modal opens
  useEffect(() => {
    if (aliases.length > 0 && !aliases.find((a) => a.id === fromAliasId)) {
      setFromAliasId(aliases[0].id);
    }
  }, [aliases, open]);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  if (!open) return null;

  async function handleSend() {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) {
      toast.error('Invalid email address');
      return;
    }

    setSending(true);
    try {
      const bodyHtml = body
        .split('\n')
        .map((line) => `<p>${line || '<br>'}</p>`)
        .join('');

      const res = await fetch('/api/admin/emails/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAliasId,
          to: to.trim(),
          subject: subject.trim(),
          bodyHtml,
          bodyText: body,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success('Email sent successfully');
      setTo('');
      setSubject('');
      setBody('');
      onClose();
      onSent(data.conversationId);
    } catch (err: any) {
      toast.error(err.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-800">New Email</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* From — dropdown for multiple aliases, static for single alias */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            {aliases.length <= 1 ? (
              <div className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-gray-50">
                {aliases[0]?.display_name} &lt;{aliases[0]?.alias_email}&gt;
              </div>
            ) : (
              <select
                value={fromAliasId}
                onChange={(e) => setFromAliasId(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1]"
              >
                {aliases.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.display_name} &lt;{a.alias_email}&gt;
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* To */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="recipient@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1]"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1]"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              placeholder="Type your message..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] resize-none"
            />
          </div>
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
            onClick={handleSend}
            disabled={sending}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#E67E22] hover:bg-[#CA6F1E] rounded-lg disabled:opacity-50 transition-colors"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
