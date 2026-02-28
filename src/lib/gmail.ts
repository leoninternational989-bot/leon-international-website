import { google, gmail_v1 } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

export { gmail };

// Decode base64url content from Gmail API
export function decodeBase64Url(data: string): string {
  return Buffer.from(data, 'base64url').toString('utf-8');
}

// Extract header value from Gmail message headers
export function getHeader(
  headers: gmail_v1.Schema$MessagePartHeader[] | undefined,
  name: string
): string {
  return headers?.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value || '';
}

// Parse email body from message parts (text/plain and text/html)
export function parseBody(payload: gmail_v1.Schema$MessagePart | undefined): {
  text: string;
  html: string;
} {
  if (!payload) return { text: '', html: '' };

  let text = '';
  let html = '';

  function walk(part: gmail_v1.Schema$MessagePart) {
    if (part.mimeType === 'text/plain' && part.body?.data) {
      text = decodeBase64Url(part.body.data);
    } else if (part.mimeType === 'text/html' && part.body?.data) {
      html = decodeBase64Url(part.body.data);
    }
    if (part.parts) {
      part.parts.forEach(walk);
    }
  }

  walk(payload);
  return { text, html };
}

// Extract attachment metadata from message parts
export interface AttachmentMeta {
  partId: string;
  filename: string;
  mimeType: string;
  size: number;
  attachmentId: string;
}

export function extractAttachments(
  payload: gmail_v1.Schema$MessagePart | undefined
): AttachmentMeta[] {
  const attachments: AttachmentMeta[] = [];
  if (!payload) return attachments;

  function walk(part: gmail_v1.Schema$MessagePart) {
    if (part.filename && part.body?.attachmentId) {
      attachments.push({
        partId: part.partId || '',
        filename: part.filename,
        mimeType: part.mimeType || 'application/octet-stream',
        size: part.body.size || 0,
        attachmentId: part.body.attachmentId,
      });
    }
    if (part.parts) {
      part.parts.forEach(walk);
    }
  }

  walk(payload);
  return attachments;
}

// Download attachment content from Gmail API
export async function downloadAttachment(
  messageId: string,
  attachmentId: string
): Promise<Buffer> {
  const res = await gmail.users.messages.attachments.get({
    userId: 'me',
    messageId,
    id: attachmentId,
  });
  return Buffer.from(res.data.data || '', 'base64url');
}

// Fetch new emails since a given historyId, or recent messages if no historyId
export async function fetchNewEmails(lastHistoryId?: string): Promise<{
  messages: gmail_v1.Schema$Message[];
  newHistoryId: string;
}> {
  if (lastHistoryId) {
    try {
      const historyRes = await gmail.users.history.list({
        userId: 'me',
        startHistoryId: lastHistoryId,
        historyTypes: ['messageAdded'],
        labelId: 'INBOX',
      });

      const newHistoryId = historyRes.data.historyId || lastHistoryId;
      const messageIds = new Set<string>();

      historyRes.data.history?.forEach((h) => {
        h.messagesAdded?.forEach((m) => {
          if (m.message?.id) messageIds.add(m.message.id);
        });
      });

      const messages: gmail_v1.Schema$Message[] = [];
      for (const id of messageIds) {
        const msg = await gmail.users.messages.get({
          userId: 'me',
          id,
          format: 'full',
        });
        messages.push(msg.data);
      }

      return { messages, newHistoryId };
    } catch (err: any) {
      // If historyId is too old, fall back to listing recent messages
      if (err.code === 404) {
        return fetchRecentMessages();
      }
      throw err;
    }
  }

  return fetchRecentMessages();
}

// Fetch recent inbox messages (fallback / initial sync)
async function fetchRecentMessages(): Promise<{
  messages: gmail_v1.Schema$Message[];
  newHistoryId: string;
}> {
  const listRes = await gmail.users.messages.list({
    userId: 'me',
    labelIds: ['INBOX'],
    maxResults: 50,
  });

  const messages: gmail_v1.Schema$Message[] = [];
  for (const item of listRes.data.messages || []) {
    if (item.id) {
      const msg = await gmail.users.messages.get({
        userId: 'me',
        id: item.id,
        format: 'full',
      });
      messages.push(msg.data);
    }
  }

  // Get current historyId from profile
  const profile = await gmail.users.getProfile({ userId: 'me' });
  const newHistoryId = profile.data.historyId || '';

  return { messages, newHistoryId };
}

// Send email via Gmail API (supports From alias + attachments)
export async function sendGmailEmail(params: {
  from: string;
  fromName?: string;
  to: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  inReplyTo?: string;
  threadId?: string;
  attachments?: Array<{ filename: string; mimeType: string; content: Buffer }>;
}): Promise<{ messageId: string; threadId: string }> {
  const fromHeader = params.fromName
    ? `${params.fromName} <${params.from}>`
    : params.from;

  const hasAttachments = params.attachments && params.attachments.length > 0;
  const altBoundary = `boundary_alt_${Date.now()}`;
  const mixedBoundary = `boundary_mixed_${Date.now()}`;

  const headers = [
    `From: ${fromHeader}`,
    `To: ${params.to}`,
    `Subject: ${params.subject}`,
    `MIME-Version: 1.0`,
  ];

  if (params.inReplyTo) {
    headers.push(`In-Reply-To: ${params.inReplyTo}`);
    headers.push(`References: ${params.inReplyTo}`);
  }

  // Build the text/html alternative part
  const altPart = [
    `--${altBoundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    '',
    params.bodyText || params.bodyHtml.replace(/<[^>]*>/g, ''),
    `--${altBoundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    '',
    params.bodyHtml,
    `--${altBoundary}--`,
  ].join('\r\n');

  let rawMessage: string;

  if (hasAttachments) {
    headers.push(`Content-Type: multipart/mixed; boundary="${mixedBoundary}"`);

    const parts = [
      headers.join('\r\n'),
      '',
      `--${mixedBoundary}`,
      `Content-Type: multipart/alternative; boundary="${altBoundary}"`,
      '',
      altPart,
    ];

    for (const att of params.attachments!) {
      parts.push(`--${mixedBoundary}`);
      parts.push(`Content-Type: ${att.mimeType}; name="${att.filename}"`);
      parts.push(`Content-Disposition: attachment; filename="${att.filename}"`);
      parts.push('Content-Transfer-Encoding: base64');
      parts.push('');
      parts.push(att.content.toString('base64'));
    }

    parts.push(`--${mixedBoundary}--`);
    rawMessage = parts.join('\r\n');
  } else {
    headers.push(`Content-Type: multipart/alternative; boundary="${altBoundary}"`);
    rawMessage = [headers.join('\r\n'), '', altPart].join('\r\n');
  }

  const encodedMessage = Buffer.from(rawMessage).toString('base64url');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId: params.threadId,
    },
  });

  return {
    messageId: res.data.id || '',
    threadId: res.data.threadId || '',
  };
}
