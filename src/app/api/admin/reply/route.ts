import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateEmailTemplate } from '@/lib/email-template';

const GMAIL_USER = process.env.Gmail_User!;
const GMAIL_APP_PASSWORD = process.env.Gmail_APP_Password!;
const ADMIN_EMAIL = process.env.Admin_Email!;

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reply API error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
