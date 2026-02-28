import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { generateEmailTemplate } from '@/lib/email-template';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const GMAIL_USER = process.env.Gmail_User!;
const GMAIL_APP_PASSWORD = process.env.Gmail_APP_Password!;
const ADMIN_EMAIL = process.env.Admin_Email!;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

function validateForm(data: ContactFormData) {
  const errors: Record<string, string> = {};

  // Name
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name is required (at least 2 characters)';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name must be under 100 characters';
  }

  // Email
  if (!data.email || !data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone (optional but validate format if provided)
  if (data.phone && data.phone.trim()) {
    const cleaned = data.phone.replace(/[\s\-\(\)]/g, '');
    if (!/^\+?[0-9]{7,15}$/.test(cleaned)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // Company (optional, but validate length if provided)
  if (data.company && data.company.trim().length > 100) {
    errors.company = 'Company name must be under 100 characters';
  }

  // Subject
  const validSubjects = ['General Inquiry', 'Service Request', 'Parts Inquiry', 'Quote Request', 'Other'];
  if (!data.subject || !validSubjects.includes(data.subject)) {
    errors.subject = 'Please select a valid subject';
  }

  // Message
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message is required (at least 10 characters)';
  } else if (data.message.trim().length > 2000) {
    errors.message = 'Message must be under 2000 characters';
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate
    const errors = validateForm(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const trimmed = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      subject: body.subject,
      message: body.message.trim(),
    };

    // Save to Supabase
    const { data: contactData, error: dbError } = await supabase.from('contacts').insert({
      name: trimmed.name,
      email: trimmed.email,
      phone: trimmed.phone,
      company: trimmed.company,
      subject: trimmed.subject,
      message: trimmed.message,
    }).select('id').single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to save your inquiry. Please try again.' },
        { status: 500 }
      );
    }

    // Auto-create conversation for the email system
    try {
      const { data: adminAlias } = await supabaseAdmin
        .from('email_aliases')
        .select('id')
        .eq('alias_email', 'admin@leon-international.com')
        .single();

      if (adminAlias) {
        const { data: conv } = await supabaseAdmin
          .from('conversations')
          .upsert({
            alias_id: adminAlias.id,
            external_email: trimmed.email,
            external_name: trimmed.name,
            subject: `Contact: ${trimmed.subject}`,
            status: 'open',
            source: 'contact_form',
            contact_id: contactData?.id || null,
            unread_count: 1,
          }, { onConflict: 'alias_id,external_email' })
          .select('id')
          .single();

        if (conv) {
          await supabaseAdmin.from('messages').insert({
            conversation_id: conv.id,
            direction: 'inbound',
            sender_email: trimmed.email,
            sender_name: trimmed.name,
            recipient_email: 'admin@leon-international.com',
            subject: trimmed.subject,
            body_text: trimmed.message,
            body_html: `<p>${trimmed.message.replace(/\n/g, '<br>')}</p>`,
            is_read: false,
          });
        }
      }
    } catch (convErr) {
      console.error('Conversation creation error (non-fatal):', convErr);
    }

    // Build email sections
    const sections = [
      { label: 'Name', value: trimmed.name },
      { label: 'Email', value: trimmed.email },
      ...(trimmed.phone ? [{ label: 'Phone', value: trimmed.phone }] : []),
      ...(trimmed.company ? [{ label: 'Company', value: trimmed.company }] : []),
      { label: 'Subject', value: trimmed.subject },
      { label: 'Message', value: trimmed.message },
    ];

    // Admin email
    const adminHtml = generateEmailTemplate({
      recipientName: 'Admin',
      heading: 'New Contact Inquiry',
      message: `You have received a new contact inquiry from <strong>${trimmed.name}</strong>. Here are the details:`,
      sections,
    });

    // Client confirmation email
    const clientHtml = generateEmailTemplate({
      recipientName: trimmed.name,
      heading: 'Thank You for Contacting Us',
      message:
        'We have received your inquiry and our team will get back to you within 24 hours. Below is a copy of your submission for your records.',
      sections: [
        { label: 'Subject', value: trimmed.subject },
        { label: 'Message', value: trimmed.message },
      ],
      contactActions: {
        phone: '+923132277773',
        whatsappMessage: `Hi Leon International, I recently submitted a contact inquiry (${trimmed.subject}) and would like to follow up.`,
      },
    });

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail({
        from: `"Leon International" <${ADMIN_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `New Contact: ${trimmed.subject} — ${trimmed.name}`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"Leon International" <${ADMIN_EMAIL}>`,
        to: trimmed.email,
        subject: 'Thank you for contacting Leon International',
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
