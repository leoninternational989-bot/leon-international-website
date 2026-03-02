import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { sendGmailEmail } from '@/lib/gmail';
import { getAuthenticatedUserId } from '@/lib/auth-helper';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Verify authenticated user (cookie or Bearer token)
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fromAliasId, to, subject, bodyHtml, bodyText, attachmentPaths } = await request.json();

    if (!fromAliasId || !to || !subject || !bodyHtml) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Look up alias
    const { data: alias, error: aliasError } = await supabaseAdmin
      .from('email_aliases')
      .select('id, alias_email, display_name')
      .eq('id', fromAliasId)
      .eq('is_active', true)
      .single();

    if (aliasError || !alias) {
      return NextResponse.json({ error: 'Alias not found' }, { status: 404 });
    }

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
      from: alias.alias_email,
      fromName: alias.display_name,
      to,
      subject,
      bodyHtml,
      bodyText,
      attachments,
    });

    // Find existing conversation or create new one
    const normalizedTo = to.trim().toLowerCase();

    let conversationId: string;

    const { data: existingConv } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('alias_id', alias.id)
      .eq('external_email', normalizedTo)
      .single();

    if (existingConv) {
      conversationId = existingConv.id;
      // Update last_message_at and reopen if closed/resolved
      const { data: convStatus } = await supabaseAdmin
        .from('conversations')
        .select('status')
        .eq('id', existingConv.id)
        .single();

      const updateData: Record<string, unknown> = {
        last_message_at: new Date().toISOString(),
        subject,
      };
      if (convStatus?.status === 'closed' || convStatus?.status === 'resolved') {
        updateData.status = 'open';
      }

      await supabaseAdmin
        .from('conversations')
        .update(updateData)
        .eq('id', existingConv.id);
    } else {
      const { data: newConv, error: convError } = await supabaseAdmin
        .from('conversations')
        .insert({
          alias_id: alias.id,
          external_email: normalizedTo,
          external_name: null,
          subject,
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

    // Create first outbound message
    const { data: newMsg, error: msgError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversationId,
        direction: 'outbound',
        sender_email: alias.alias_email,
        sender_name: alias.display_name,
        recipient_email: to.trim().toLowerCase(),
        subject,
        body_text: bodyText || bodyHtml.replace(/<[^>]*>/g, ''),
        body_html: bodyHtml,
        gmail_message_id: messageId,
        gmail_thread_id: threadId,
        message_id_header: rfc822MessageId || null,
        is_read: true,
        sent_by_user: userId,
      })
      .select('id')
      .single();

    if (msgError) {
      return NextResponse.json({ error: msgError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      conversationId: conversationId,
      messageId: newMsg?.id,
    });
  } catch (err: any) {
    console.error('Compose email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send' }, { status: 500 });
  }
}
