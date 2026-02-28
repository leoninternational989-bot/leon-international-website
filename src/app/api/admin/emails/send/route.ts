import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { sendGmailEmail, gmail, getHeader } from '@/lib/gmail';

// Allow up to 25MB request body for attachments (Gmail's limit is 25MB)
export const maxDuration = 30;


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

    const { conversationId, bodyHtml, bodyText, subject, attachments: attachmentData } = await request.json();

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

    // Get the last message for threading (need RFC Message-ID for proper In-Reply-To)
    const { data: lastMessage } = await supabaseAdmin
      .from('messages')
      .select('gmail_message_id, gmail_thread_id, message_id_header, subject')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Strip existing Re:/Fwd: prefixes to avoid "Re: Re: Re:" stacking
    const baseSubject = (lastMessage?.subject || conversation.subject || '').replace(/^(Re:\s*|Fwd:\s*)+/i, '');
    const replySubject = subject || `Re: ${baseSubject}`;
    const aliasEmail = conversation.email_aliases?.alias_email || 'admin@leon-international.com';
    const aliasName = conversation.email_aliases?.display_name || 'Leon International';

    // Convert base64 attachment data to Buffers
    const attachments = attachmentData?.map((att: { filename: string; mimeType: string; base64: string }) => ({
      filename: att.filename,
      mimeType: att.mimeType,
      content: Buffer.from(att.base64, 'base64'),
    }));

    // Send via Gmail API (use RFC Message-ID for proper threading)
    const { messageId, threadId } = await sendGmailEmail({
      from: aliasEmail,
      fromName: aliasName,
      to: conversation.external_email,
      subject: replySubject,
      bodyHtml,
      bodyText,
      inReplyTo: lastMessage?.message_id_header || undefined,
      threadId: lastMessage?.gmail_thread_id || undefined,
      attachments,
    });

    // Fetch sent message to get its RFC Message-ID header for future threading
    let sentMessageIdHeader: string | null = null;
    try {
      const sentMsg = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'metadata',
        metadataHeaders: ['Message-ID'],
      });
      sentMessageIdHeader = getHeader(sentMsg.data.payload?.headers, 'Message-ID') || null;
    } catch {
      // Non-critical — just won't have Message-ID for this outbound message
    }

    // Save message to database
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
        message_id_header: sentMessageIdHeader,
        in_reply_to: lastMessage?.message_id_header || null,
        is_read: true,
        sent_by_user: user.id,
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
