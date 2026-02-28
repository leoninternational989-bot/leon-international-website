'use client';

import { FileText, Download, Image as ImageIcon, Music, Video } from 'lucide-react';
import { createClient } from '@/lib/supabase-browser';

interface Attachment {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getSignedUrl(path: string): string {
  const supabase = createClient();
  const { data } = supabase.storage
    .from('email-attachments')
    .getPublicUrl(path);
  return data.publicUrl;
}

async function downloadFile(attachment: Attachment) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from('email-attachments')
    .download(attachment.storage_path);

  if (error || !data) return;

  const url = URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = attachment.file_name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AttachmentPreview({ attachment }: { attachment: Attachment }) {
  const isImage = attachment.file_type.startsWith('image/');
  const isAudio = attachment.file_type.startsWith('audio/');
  const isVideo = attachment.file_type.startsWith('video/');

  if (isImage) {
    return (
      <div className="group relative inline-block">
        <img
          src={getSignedUrl(attachment.storage_path)}
          alt={attachment.file_name}
          className="max-w-[200px] max-h-[150px] rounded-lg border border-gray-200 object-cover cursor-pointer"
          onClick={() => window.open(getSignedUrl(attachment.storage_path), '_blank')}
        />
        <div className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
          <ImageIcon className="h-3 w-3" />
          <span className="truncate max-w-[150px]">{attachment.file_name}</span>
          <span>({formatSize(attachment.file_size)})</span>
        </div>
      </div>
    );
  }

  if (isAudio) {
    return (
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 max-w-[280px]">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
          <Music className="h-3.5 w-3.5" />
          <span className="truncate">{attachment.file_name}</span>
        </div>
        <audio controls className="w-full h-8" preload="none">
          <source src={getSignedUrl(attachment.storage_path)} type={attachment.file_type} />
        </audio>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="bg-gray-50 rounded-lg p-2 border border-gray-200 max-w-[300px]">
        <video
          controls
          preload="none"
          className="w-full rounded-md"
        >
          <source src={getSignedUrl(attachment.storage_path)} type={attachment.file_type} />
        </video>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
          <Video className="h-3 w-3" />
          <span className="truncate">{attachment.file_name}</span>
          <span>({formatSize(attachment.file_size)})</span>
        </div>
      </div>
    );
  }

  // Generic file
  return (
    <button
      onClick={() => downloadFile(attachment)}
      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 transition-colors max-w-[250px]"
    >
      <FileText className="h-4 w-4 text-gray-400 shrink-0" />
      <span className="truncate">{attachment.file_name}</span>
      <span className="text-gray-400 shrink-0">({formatSize(attachment.file_size)})</span>
      <Download className="h-3.5 w-3.5 text-gray-400 shrink-0" />
    </button>
  );
}
