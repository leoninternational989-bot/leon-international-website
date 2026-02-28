'use client';

import { useState, useMemo } from 'react';
import DOMPurify from 'dompurify';

interface MessageBodyProps {
  html?: string | null;
  text?: string | null;
  isOutbound?: boolean;
}

const MAX_HEIGHT = 300;

export default function MessageBody({ html, text, isOutbound }: MessageBodyProps) {
  const [expanded, setExpanded] = useState(false);

  const sanitizedHtml = useMemo(() => {
    if (!html) return '';
    return DOMPurify.sanitize(html, {
      ADD_TAGS: ['style'],
      ADD_ATTR: ['target'],
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
    });
  }, [html]);

  if (!html) {
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
        {text || ''}
      </p>
    );
  }

  return (
    <div className="relative">
      <div
        className={`overflow-hidden transition-all duration-200 ${
          !expanded ? '' : ''
        }`}
        style={!expanded ? { maxHeight: `${MAX_HEIGHT}px` } : undefined}
      >
        <div
          className={`text-sm leading-relaxed prose prose-sm max-w-none break-words overflow-hidden
            [&_img]:max-w-full [&_img]:h-auto
            [&_table]:max-w-full [&_table]:overflow-x-auto [&_table]:block
            [&_pre]:max-w-full [&_pre]:overflow-x-auto
            [&_a]:break-all
            ${isOutbound ? 'prose-invert' : ''}`}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      </div>

      {/* Gradient fade + toggle */}
      {!expanded && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${
            isOutbound
              ? 'from-[#0E2F44] via-[#0E2F44]/80'
              : 'from-white via-white/80'
          } to-transparent flex items-end justify-center pb-1 message-fade`}
        >
          <button
            onClick={() => setExpanded(true)}
            className={`text-[11px] font-medium px-3 py-0.5 rounded-full ${
              isOutbound
                ? 'text-blue-300 hover:text-blue-200 bg-[#0E2F44]/80'
                : 'text-[#2E86C1] hover:text-[#1A6DA3] bg-white/80'
            } transition-colors`}
          >
            Show more
          </button>
        </div>
      )}

      {expanded && (
        <button
          onClick={() => setExpanded(false)}
          className={`text-[11px] font-medium mt-2 ${
            isOutbound ? 'text-blue-300 hover:text-blue-200' : 'text-[#2E86C1] hover:text-[#1A6DA3]'
          } transition-colors`}
        >
          Show less
        </button>
      )}
    </div>
  );
}
