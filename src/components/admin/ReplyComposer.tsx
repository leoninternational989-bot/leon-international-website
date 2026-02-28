'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Send, Paperclip, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import VoiceRecorder from './VoiceRecorder';
import { createClient } from '@/lib/supabase-browser';

interface ReplyComposerProps {
  conversationId: string;
  onSent: () => void;
}

interface PendingFile {
  file: File | Blob;
  name: string;
  type: string;
  preview?: string;
}

export default function ReplyComposer({ conversationId, onSent }: ReplyComposerProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function addFiles(newFiles: FileList | File[] | null) {
    if (!newFiles) return;
    const arr = Array.from(newFiles);
    const pending: PendingFile[] = arr.map((f) => ({
      file: f,
      name: f.name,
      type: f.type,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }));
    setFiles((prev) => [...prev, ...pending]);
  }

  function removeFile(index: number) {
    setFiles((prev) => {
      const removed = prev[index];
      if (removed.preview) URL.revokeObjectURL(removed.preview);
      return prev.filter((_, i) => i !== index);
    });
  }

  function handleVoiceRecorded(blob: Blob, filename: string) {
    setFiles((prev) => [...prev, { file: blob, name: filename, type: 'audio/webm' }]);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }

  async function uploadAttachments(messageId: string) {
    const supabase = createClient();
    for (const pf of files) {
      const storagePath = `${conversationId}/${messageId}/${pf.name}`;
      await supabase.storage
        .from('email-attachments')
        .upload(storagePath, pf.file, { contentType: pf.type });

      // Save attachment record in DB
      await supabase.from('attachments').insert({
        message_id: messageId,
        file_name: pf.name,
        file_type: pf.type,
        file_size: pf.file.size,
        storage_path: storagePath,
      });
    }
  }

  async function handleSend() {
    if (!message.trim() && files.length === 0) return;

    setSending(true);
    try {
      // Convert plain text to simple HTML
      const bodyHtml = message
        .split('\n')
        .map((line) => `<p>${line || '<br>'}</p>`)
        .join('');

      // Read files as base64 for sending with the email
      const attachments = await Promise.all(
        files.map(async (pf) => {
          const buf = await pf.file.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(buf).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          return { filename: pf.name, mimeType: pf.type, base64 };
        })
      );

      const res = await fetch('/api/admin/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          bodyHtml,
          bodyText: message,
          attachments: attachments.length > 0 ? attachments : undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data = await res.json();

      // Upload attachments if any
      if (files.length > 0 && data.messageId) {
        await uploadAttachments(data.messageId);
      }

      // Clear form
      setMessage('');
      files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
      setFiles([]);
      onSent();
    } catch (err: any) {
      toast.error(err.message || 'Failed to send');
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      className="border-t border-gray-200 bg-white p-4"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {/* Pending files */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {files.map((pf, i) => (
            <div
              key={i}
              className="relative group flex items-center gap-1.5 bg-gray-100 rounded-lg px-2.5 py-1.5 text-xs text-gray-600"
            >
              {pf.preview ? (
                <img src={pf.preview} alt="" className="w-8 h-8 rounded object-cover" />
              ) : (
                <Paperclip className="h-3.5 w-3.5 text-gray-400" />
              )}
              <span className="truncate max-w-[120px]">{pf.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-end gap-2">
        {/* Action buttons */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            title="Attach file"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => imageInputRef.current?.click()}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            title="Attach image"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          <VoiceRecorder onRecorded={handleVoiceRecorded} />
        </div>

        {/* Text input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2E86C1]/20 focus:border-[#2E86C1] transition-colors max-h-32"
          placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
          style={{ minHeight: '42px' }}
          onInput={(e) => {
            const el = e.currentTarget;
            el.style.height = 'auto';
            el.style.height = Math.min(el.scrollHeight, 128) + 'px';
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={sending || (!message.trim() && files.length === 0)}
          className="p-2.5 rounded-xl bg-[#E67E22] text-white hover:bg-[#CA6F1E] disabled:opacity-40 transition-colors"
          title="Send"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  );
}
