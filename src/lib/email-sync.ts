import { gmail_v1 } from 'googleapis';
import { createClient } from '@supabase/supabase-js';
import {
  getHeader,
  parseBody,
  extractAttachments,
  downloadAttachment,
  fetchNewEmails,
} from './gmail';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AliasRow {
  id: string;
  alias_email: string;
}

// Extract email address from "Name <email>" format
function extractEmail(raw: string): string {
  const match = raw.match(/<([^>]+)>/);
  return (match ? match[1] : raw).trim().toLowerCase();
}

// Extract name from "Name <email>" format
function extractName(raw: string): string {
  const match = raw.match(/^"?([^"<]+)"?\s*</);
  return match ? match[1].trim() : '';
}

// Detect which alias an email was sent to (priority-based header parsing)
function detectAlias(
  headers: gmail_v1.Schema$MessagePartHeader[] | undefined,
  aliases: AliasRow[]
): AliasRow | null {
  const aliasEmails = aliases.map((a) => a.alias_email.toLowerCase());

  // Priority 1: Delivered-To header (most reliable with ImprovMX)
  const deliveredTo = getHeader(headers, 'Delivered-To').toLowerCase();
  if (deliveredTo) {
    const match = aliases.find((a) => deliveredTo.includes(a.alias_email.toLowerCase()));
    if (match) return match;
  }

  // Priority 2: X-Forwarded-To header
  const forwarded = getHeader(headers, 'X-Forwarded-To').toLowerCase();
  if (forwarded) {
    const match = aliases.find((a) => forwarded.includes(a.alias_email.toLowerCase()));
    if (match) return match;
  }

  // Priority 3: To header
  const to = getHeader(headers, 'To').toLowerCase();
  if (to) {
    for (const alias of aliases) {
      if (to.includes(alias.alias_email.toLowerCase())) return alias;
    }
  }

  // Priority 4: CC header
  const cc = getHeader(headers, 'Cc').toLowerCase();
  if (cc) {
    for (const alias of aliases) {
      if (cc.includes(alias.alias_email.toLowerCase())) return alias;
    }
  }

  // Priority 5: X-Original-To
  const originalTo = getHeader(headers, 'X-Original-To').toLowerCase();
  if (originalTo) {
    const match = aliases.find((a) => originalTo.includes(a.alias_email.toLowerCase()));
    if (match) return match;
  }

  // Fallback: admin alias
  return aliases.find((a) => a.alias_email.toLowerCase() === 'admin@leon-international.com') || null;
}

// Main sync function
export async function syncEmails(): Promise<{
  fetched: number;
  created: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let fetched = 0;
  let created = 0;

  // Get last sync info
  const { data: lastSync } = await supabaseAdmin
    .from('email_sync_log')
    .select('last_history_id')
    .eq('status', 'success')
    .order('synced_at', { ascending: false })
    .limit(1)
    .single();

  const lastHistoryId = lastSync?.last_history_id || undefined;

  // Fetch all active aliases
  const { data: aliases } = await supabaseAdmin
    .from('email_aliases')
    .select('id, alias_email')
    .eq('is_active', true);

  if (!aliases || aliases.length === 0) {
    return { fetched: 0, created: 0, errors: ['No active aliases found'] };
  }

  // Fetch new emails from Gmail
  const { messages, newHistoryId } = await fetchNewEmails(lastHistoryId);
  fetched = messages.length;

  for (const msg of messages) {
    try {
      await processMessage(msg, aliases);
      created++;
    } catch (err: any) {
      errors.push(`Message ${msg.id}: ${err.message}`);
    }
  }

  // Log sync
  await supabaseAdmin.from('email_sync_log').insert({
    emails_fetched: fetched,
    last_history_id: newHistoryId,
    status: errors.length > 0 ? 'partial' : 'success',
    error_message: errors.length > 0 ? errors.join('; ') : null,
  });

  return { fetched, created, errors };
}

async function processMessage(
  msg: gmail_v1.Schema$Message,
  aliases: AliasRow[]
) {
  const gmailMessageId = msg.id!;
  const headers = msg.payload?.headers;

  // Skip if already synced (deduplication)
  const { data: existing } = await supabaseAdmin
    .from('messages')
    .select('id')
    .eq('gmail_message_id', gmailMessageId)
    .single();

  if (existing) return;

  // Parse email details
  const fromRaw = getHeader(headers, 'From');
  const toRaw = getHeader(headers, 'To');
  const subject = getHeader(headers, 'Subject');
  const messageIdHeader = getHeader(headers, 'Message-ID');
  const inReplyTo = getHeader(headers, 'In-Reply-To');
  const gmailThreadId = msg.threadId || null;

  const senderEmail = extractEmail(fromRaw);
  const senderName = extractName(fromRaw) || senderEmail;
  const recipientEmail = extractEmail(toRaw);

  // Detect alias
  const alias = detectAlias(headers, aliases);
  if (!alias) return;

  // Determine direction: if sender matches our Gmail account, it's outbound
  const ourGmailAccount = (process.env.Gmail_User || '').toLowerCase();
  const isOutbound =
    senderEmail === ourGmailAccount ||
    aliases.some((a) => a.alias_email.toLowerCase() === senderEmail);

  const direction = isOutbound ? 'outbound' : 'inbound';

  // For inbound: external is sender. For outbound: external is recipient.
  const externalEmail = isOutbound ? recipientEmail : senderEmail;
  const externalName = isOutbound ? extractName(toRaw) || recipientEmail : senderName;

  // Find or create conversation
  const { data: conversation } = await supabaseAdmin
    .from('conversations')
    .select('id, unread_count')
    .eq('alias_id', alias.id)
    .eq('external_email', externalEmail)
    .single();

  let conversationId: string;

  if (conversation) {
    conversationId = conversation.id;
    // Update conversation
    await supabaseAdmin
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        subject: subject || undefined,
        unread_count: direction === 'inbound' ? (conversation.unread_count || 0) + 1 : conversation.unread_count,
      })
      .eq('id', conversationId);
  } else {
    const { data: newConv, error } = await supabaseAdmin
      .from('conversations')
      .insert({
        alias_id: alias.id,
        external_email: externalEmail,
        external_name: externalName,
        subject,
        status: 'open',
        unread_count: direction === 'inbound' ? 1 : 0,
        source: 'email',
      })
      .select('id')
      .single();

    if (error || !newConv) throw new Error(`Failed to create conversation: ${error?.message}`);
    conversationId = newConv.id;
  }

  // Parse body
  const { text, html } = parseBody(msg.payload);

  // Create message
  const { data: newMessage, error: msgError } = await supabaseAdmin
    .from('messages')
    .insert({
      conversation_id: conversationId,
      direction,
      sender_email: senderEmail,
      sender_name: senderName,
      recipient_email: recipientEmail,
      subject,
      body_text: text,
      body_html: html,
      gmail_message_id: gmailMessageId,
      gmail_thread_id: gmailThreadId,
      in_reply_to: inReplyTo || null,
      is_read: direction === 'outbound',
    })
    .select('id')
    .single();

  if (msgError || !newMessage) throw new Error(`Failed to create message: ${msgError?.message}`);

  // Handle attachments
  const attachmentMetas = extractAttachments(msg.payload);
  for (const att of attachmentMetas) {
    try {
      const content = await downloadAttachment(gmailMessageId, att.attachmentId);
      const storagePath = `${conversationId}/${newMessage.id}/${att.filename}`;

      await supabaseAdmin.storage
        .from('email-attachments')
        .upload(storagePath, content, {
          contentType: att.mimeType,
          upsert: false,
        });

      await supabaseAdmin.from('attachments').insert({
        message_id: newMessage.id,
        file_name: att.filename,
        file_type: att.mimeType,
        file_size: att.size,
        storage_path: storagePath,
      });
    } catch (attErr: any) {
      // Log but don't fail the whole message for attachment errors
      console.error(`Attachment error for ${att.filename}:`, attErr.message);
    }
  }

  // Create notification for inbound messages
  if (direction === 'inbound') {
    await supabaseAdmin.from('notifications').insert({
      title: `New email from ${senderName}`,
      message: subject || 'No subject',
      type: 'email',
    });
  }
}
