import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/lib/supabase-server';
import { generateEmailTemplate } from '@/lib/email-template';
import { getAuthenticatedUserId } from '@/lib/auth-helper';

const GMAIL_USER = process.env.Gmail_User!;
const GMAIL_APP_PASSWORD = process.env.Gmail_APP_Password!;
const ADMIN_EMAIL = process.env.Admin_Email!;

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
});

export async function POST(request: NextRequest) {
  try {
    const { to, name, subject, message, fromAliasId } = await request.json();

    if (!to || !name || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Determine sender alias: use provided fromAliasId, fall back to logged-in user's alias, then admin
    let senderEmail = ADMIN_EMAIL;
    let senderName = 'Leon International';
    let aliasId: string | null = null;

    if (fromAliasId) {
      // Explicit alias provided by the frontend
      const { data: alias } = await supabaseAdmin
        .from('email_aliases')
        .select('id, alias_email, display_name')
        .eq('id', fromAliasId)
        .eq('is_active', true)
        .single();

      if (alias) {
        senderEmail = alias.alias_email;
        senderName = alias.display_name;
        aliasId = alias.id;
      }
    } else {
      // Fall back: look up logged-in user's assigned alias
      try {
        const authedUserId = await getAuthenticatedUserId(request);
        if (authedUserId) {
          const { data: crmUser } = await supabaseAdmin
            .from('crm_users')
            .select('email_alias_id')
            .eq('id', authedUserId)
            .single();

          if (crmUser?.email_alias_id) {
            const { data: alias } = await supabaseAdmin
              .from('email_aliases')
              .select('id, alias_email, display_name')
              .eq('id', crmUser.email_alias_id)
              .eq('is_active', true)
              .single();

            if (alias) {
              senderEmail = alias.alias_email;
              senderName = alias.display_name;
              aliasId = alias.id;
            }
          }
        }
      } catch {
        // Non-fatal: fall back to admin
      }
    }

    // If no alias found, use admin alias ID
    if (!aliasId) {
      const { data: adminAlias } = await supabaseAdmin
        .from('email_aliases')
        .select('id')
        .eq('alias_email', ADMIN_EMAIL)
        .single();
      aliasId = adminAlias?.id || null;
    }

    const html = generateEmailTemplate({
      recipientName: name,
      heading: subject,
      message,
      contactActions: {
        phone: '+923132277773',
        whatsappMessage: `Hi Leon International, I have a follow-up regarding my inquiry.`,
      },
    });

    await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to,
      subject,
      html,
    });

    // Also record this reply in the conversation system
    if (aliasId) {
      try {
        const { data: conv } = await supabaseAdmin
          .from('conversations')
          .select('id')
          .eq('alias_id', aliasId)
          .eq('external_email', to.toLowerCase())
          .single();

        if (conv) {
          await supabaseAdmin.from('messages').insert({
            conversation_id: conv.id,
            direction: 'outbound',
            sender_email: senderEmail,
            sender_name: senderName,
            recipient_email: to,
            subject,
            body_text: message,
            body_html: html,
            is_read: true,
          });

          await supabaseAdmin
            .from('conversations')
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', conv.id);
        }
      } catch (convErr) {
        console.error('Conversation record error (non-fatal):', convErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reply API error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
