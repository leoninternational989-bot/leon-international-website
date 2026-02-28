import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { sendGmailEmail } from '@/lib/gmail';

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

    const { fromAliasId, to, subject, bodyHtml, bodyText } = await request.json();

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

    // Send via Gmail API
    const { messageId, threadId } = await sendGmailEmail({
      from: alias.alias_email,
      fromName: alias.display_name,
      to,
      subject,
      bodyHtml,
      bodyText,
    });

    // Create conversation
    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .insert({
        alias_id: alias.id,
        external_email: to.trim().toLowerCase(),
        external_name: null,
        subject,
        status: 'open',
        unread_count: 0,
        source: 'email',
      })
      .select('id')
      .single();

    if (convError || !conversation) {
      return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
    }

    // Create first outbound message
    const { data: newMsg, error: msgError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        direction: 'outbound',
        sender_email: alias.alias_email,
        sender_name: alias.display_name,
        recipient_email: to.trim().toLowerCase(),
        subject,
        body_text: bodyText || bodyHtml.replace(/<[^>]*>/g, ''),
        body_html: bodyHtml,
        gmail_message_id: messageId,
        gmail_thread_id: threadId,
        is_read: true,
        sent_by_user: user.id,
      })
      .select('id')
      .single();

    if (msgError) {
      return NextResponse.json({ error: msgError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      conversationId: conversation.id,
      messageId: newMsg?.id,
    });
  } catch (err: any) {
    console.error('Compose email error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send' }, { status: 500 });
  }
}
