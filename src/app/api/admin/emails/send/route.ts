import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendGmailEmail } from '@/lib/gmail';
import { getAuthenticatedUserId } from '@/lib/auth-helper';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify authenticated user (supports both Bearer token and cookie session)
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { conversationId, bodyHtml, bodyText, subject, attachmentPaths } = await request.json();

    if (!conversationId || !bodyHtml) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get conversation details with alias info
    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .select('*, email_aliases(alias_email, display_name)')
      .eq('id', conversationId)
      .single();

    if (convError || !conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    // Get the last message for subject/threadId
    const { data: lastMessage } = await supabaseAdmin
      .from('messages')
      .select('gmail_message_id, gmail_thread_id, message_id_header, subject')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Find the most recent message with a valid RFC Message-ID (for In-Reply-To/References)
    const { data: lastWithMsgId } = await supabaseAdmin
      .from('messages')
      .select('message_id_header')
      .eq('conversation_id', conversationId)
      .not('message_id_header', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const inReplyToHeader = lastWithMsgId?.message_id_header || undefined;

    // Strip existing Re:/Fwd: prefixes to avoid "Re: Re: Re:" stacking
    const baseSubject = (lastMessage?.subject || conversation.subject || '').replace(/^(Re:\s*|Fwd:\s*)+/i, '');
    const replySubject = subject || `Re: ${baseSubject}`;
    const aliasEmail = conversation.email_aliases?.alias_email || 'admin@leon-international.com';
    const aliasName = conversation.email_aliases?.display_name || 'Leon International';

    // Download attachments from Supabase Storage if any
    let attachments: Array<{ filename: string; mimeType: string; content: Buffer }> | undefined;
    if (attachmentPaths && attachmentPaths.length > 0) {
      attachments = [];
      for (const att of attachmentPaths as Array<{ storagePath: string; filename: string; mimeType: string }>) {
        const { data, error } = await supabaseAdmin.storage
          .from('email-attachments')
          .download(att.storagePath);
        if (!error && data) {
          const buffer = Buffer.from(await data.arrayBuffer());
          attachments.push({ filename: att.filename, mimeType: att.mimeType, content: buffer });
        }
      }
    }

    // Send via Gmail API
    const { messageId, threadId, rfc822MessageId } = await sendGmailEmail({
      from: aliasEmail,
      fromName: aliasName,
      to: conversation.external_email,
      subject: replySubject,
      bodyHtml,
      bodyText,
      inReplyTo: inReplyToHeader,
      threadId: lastMessage?.gmail_thread_id || undefined,
      attachments,
    });

    // Save message to database (including RFC Message-ID for future threading)
    const { data: newMsg, error: msgError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        direction: 'outbound',
        sender_email: aliasEmail,
        sender_name: aliasName,
        recipient_email: conversation.external_email,
        subject: replySubject,
        body_text: bodyText || bodyHtml.replace(/<[^>]*>/g, ''),
        body_html: bodyHtml,
        gmail_message_id: messageId,
        gmail_thread_id: threadId,
        message_id_header: rfc822MessageId || null,
        in_reply_to: inReplyToHeader || null,
        is_read: true,
        sent_by_user: userId,
      })
      .select('id')
      .single();

    if (msgError) {
      return NextResponse.json({ error: msgError.message }, { status: 500 });
    }

    // Update conversation
    await supabaseAdmin
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        status: conversation.status === 'open' ? 'assigned' : conversation.status,
      })
      .eq('id', conversationId);

    return NextResponse.json({ success: true, messageId: newMsg?.id });
  } catch (err: any) {
    console.error('Send email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send' }, { status: 500 });
  }
}
