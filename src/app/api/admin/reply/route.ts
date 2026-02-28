import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import { generateEmailTemplate } from '@/lib/email-template';

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
    const { to, name, subject, message } = await request.json();

    if (!to || !name || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
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
      from: `"Leon International" <${ADMIN_EMAIL}>`,
      to,
      subject,
      html,
    });

    // Also record this reply in the conversation system
    try {
      const { data: adminAlias } = await supabaseAdmin
        .from('email_aliases')
        .select('id')
        .eq('alias_email', 'admin@leon-international.com')
        .single();

      if (adminAlias) {
        // Find existing conversation or skip
        const { data: conv } = await supabaseAdmin
          .from('conversations')
          .select('id')
          .eq('alias_id', adminAlias.id)
          .eq('external_email', to.toLowerCase())
          .single();

        if (conv) {
          await supabaseAdmin.from('messages').insert({
            conversation_id: conv.id,
            direction: 'outbound',
            sender_email: ADMIN_EMAIL,
            sender_name: 'Leon International',
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
      }
    } catch (convErr) {
      console.error('Conversation record error (non-fatal):', convErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reply API error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
