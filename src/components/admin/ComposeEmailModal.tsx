'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, Paperclip, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import VoiceRecorder from './VoiceRecorder';
import { createClient } from '@/lib/supabase-browser';

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

interface PendingFile {
  file: File | Blob;
  name: string;
  type: string;
  preview?: string;
}

export default function ComposeEmailModal({ open, onClose, aliases, onSent }: ComposeEmailModalProps) {
  const [fromAliasId, setFromAliasId] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [sending, setSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Sync fromAliasId when aliases change or modal opens
  useEffect(() => {
    if (aliases.length > 0 && !aliases.find((a) => a.id === fromAliasId)) {
      setFromAliasId(aliases[0].id);
    }
  }, [aliases, open]);

  if (!open) return null;

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

  function resetForm() {
    setTo('');
    setSubject('');
    setBody('');
    files.forEach((f) => { if (f.preview) URL.revokeObjectURL(f.preview); });
    setFiles([]);
  }

  async function handleSend() {
    if (!to.trim() || !subject.trim() || (!body.trim() && files.length === 0)) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to.trim())) {
      toast.error('Invalid email address');
      return;
    }

    setSending(true);
    try {
      const supabase = createClient();
      const bodyHtml = body
        .split('\n')
        .map((line) => `<p>${line || '<br>'}</p>`)
        .join('');

      // Upload files to temp storage
      const tempId = Date.now().toString();
      const attachmentPaths: Array<{ storagePath: string; filename: string; mimeType: string; fileSize: number }> = [];

      for (const pf of files) {
        const storagePath = `compose-temp/temp-${tempId}/${pf.name}`;
        const { error: uploadError } = await supabase.storage
          .from('email-attachments')
          .upload(storagePath, pf.file, { contentType: pf.type });

        if (uploadError) {
          throw new Error(`Failed to upload ${pf.name}: ${uploadError.message}`);
        }

        attachmentPaths.push({
          storagePath,
          filename: pf.name,
          mimeType: pf.type,
          fileSize: pf.file.size,
        });
      }

      const res = await fetch('/api/admin/emails/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAliasId,
          to: to.trim(),
          subject: subject.trim(),
          bodyHtml,
          bodyText: body,
          attachmentPaths: attachmentPaths.length > 0 ? attachmentPaths : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Move attachments to permanent path and save DB records
      if (attachmentPaths.length > 0 && data.conversationId && data.messageId) {
        for (const att of attachmentPaths) {
          const permanentPath = `${data.conversationId}/${data.messageId}/${att.filename}`;

          const { data: fileData } = await supabase.storage
            .from('email-attachments')
            .download(att.storagePath);

          if (fileData) {
            await supabase.storage
              .from('email-attachments')
              .upload(permanentPath, fileData, { contentType: att.mimeType });

            await supabase.from('attachments').insert({
              message_id: data.messageId,
              file_name: att.filename,
              file_type: att.mimeType,
              file_size: att.fileSize,
              storage_path: permanentPath,
            });
          }

          // Clean up temp file
          await supabase.storage
            .from('email-attachments')
            .remove([att.storagePath]);
        }
      }

      toast.success('Email sent successfully');
      resetForm();
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
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
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

          {/* Message */}
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

          {/* Pending files */}
          {files.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-200">
          {/* Attachment buttons */}
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

          {/* Action buttons */}
          <div className="flex items-center gap-3">
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

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
        />
        <input
          ref={imageInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
        />
      </div>
    </div>
  );
}
