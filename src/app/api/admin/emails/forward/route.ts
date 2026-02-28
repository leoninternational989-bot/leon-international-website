import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { sendGmailEmail, gmail, extractAttachments, downloadAttachment } from '@/lib/gmail';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify authenticated user
    const supabase = await createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messageId, forwardTo } = await request.json();

    if (!messageId || !forwardTo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get the original message with conversation info AND attachments in one query
    const { data: message, error: msgError } = await supabaseAdmin
      .from('messages')
      .select('*, conversations(*, email_aliases(alias_email, display_name))')
      .eq('id', messageId)
      .single();

    if (msgError || !message) {
      console.error('Forward: message query error:', msgError);
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    const conversation = message.conversations;
    const aliasEmail = conversation?.email_aliases?.alias_email || 'admin@leon-international.com';
    const aliasName = conversation?.email_aliases?.display_name || 'Leon International';

    // Build forwarded content
    const originalDate = new Date(message.created_at).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const forwardHeader = `
      <br><br>
      <div style="border-top: 1px solid #ccc; padding-top: 12px; margin-top: 12px; color: #555; font-size: 13px;">
        <strong>---------- Forwarded message ----------</strong><br>
        <strong>From:</strong> ${message.sender_name || message.sender_email} &lt;${message.sender_email}&gt;<br>
        <strong>Date:</strong> ${originalDate}<br>
        <strong>Subject:</strong> ${message.subject || '(no subject)'}<br>
        <strong>To:</strong> ${message.recipient_email}<br>
      </div>
      <br>
    `;

    const bodyHtml = forwardHeader + (message.body_html || message.body_text || '');
    const baseSubject = (message.subject || '').replace(/^(Fwd:\s*|Re:\s*)+/i, '');
    const fwdSubject = `Fwd: ${baseSubject}`;

    // Download attachments directly from Gmail API (most reliable source)
    let attachments: Array<{ filename: string; mimeType: string; content: Buffer }> | undefined;
    if (message.gmail_message_id) {
      try {
        const gmailFullMsg = await gmail.users.messages.get({
          userId: 'me',
          id: message.gmail_message_id,
          format: 'full',
        });
        const attMetas = extractAttachments(gmailFullMsg.data.payload);
        if (attMetas.length > 0) {
          attachments = [];
          for (const att of attMetas) {
            try {
              const content = await downloadAttachment(message.gmail_message_id, att.attachmentId);
              attachments.push({ filename: att.filename, mimeType: att.mimeType, content });
            } catch (dlErr: any) {
              console.error(`Forward: Gmail attachment download failed for ${att.filename}:`, dlErr.message);
            }
          }
        }
      } catch (gmailErr: any) {
        console.error('Forward: Gmail message fetch failed:', gmailErr.message);
      }
    }

    // Send via Gmail API
    const { messageId: gmailMsgId, threadId, rfc822MessageId } = await sendGmailEmail({
      from: aliasEmail,
      fromName: aliasName,
      to: forwardTo,
      subject: fwdSubject,
      bodyHtml,
      bodyText: message.body_text || '',
      attachments,
    });

    // Find or create conversation for the forwarded-to recipient
    const { data: existingConv } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('alias_id', conversation.alias_id)
      .eq('external_email', forwardTo.trim().toLowerCase())
      .eq('is_deleted', false)
      .single();

    let conversationId: string;

    if (existingConv) {
      conversationId = existingConv.id;
      await supabaseAdmin
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);
    } else {
      const { data: newConv, error: convError } = await supabaseAdmin
        .from('conversations')
        .insert({
          alias_id: conversation.alias_id,
          external_email: forwardTo.trim().toLowerCase(),
          external_name: null,
          subject: fwdSubject,
          status: 'open',
          unread_count: 0,
          source: 'email',
        })
        .select('id')
        .single();

      if (convError || !newConv) {
        return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
      }
      conversationId = newConv.id;
    }

    // Save forwarded message record
    const { data: newMsg } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        direction: 'outbound',
        sender_email: aliasEmail,
        sender_name: aliasName,
        recipient_email: forwardTo.trim().toLowerCase(),
        subject: fwdSubject,
        body_text: message.body_text || '',
        body_html: bodyHtml,
        gmail_message_id: gmailMsgId,
        gmail_thread_id: threadId,
        message_id_header: rfc822MessageId || null,
        is_read: true,
        sent_by_user: user.id,
      })
      .select('id')
      .single();

    // Save attachment records so they appear in the CRM chat bubble
    if (newMsg && attachments && attachments.length > 0) {
      for (const att of attachments) {
        const storagePath = `${conversationId}/${newMsg.id}/${att.filename}`;
        await supabaseAdmin.storage
          .from('email-attachments')
          .upload(storagePath, att.content, { contentType: att.mimeType });
        await supabaseAdmin.from('attachments').insert({
          message_id: newMsg.id,
          file_name: att.filename,
          file_type: att.mimeType,
          file_size: att.content.length,
          storage_path: storagePath,
        });
      }
    }

    return NextResponse.json({ success: true, conversationId });
  } catch (err: any) {
    console.error('Forward email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to forward' }, { status: 500 });
  }
}
