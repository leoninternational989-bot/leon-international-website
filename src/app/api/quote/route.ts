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

interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  requestType: string;
  serviceCategory: string;
  serviceLocation: string;
  equipmentBrand: string;
  conditionPreference: string;
  partDescription: string;
  vesselName: string;
  imoNumber: string;
  urgency: string;
  additionalNotes: string;
}

function validateForm(data: QuoteFormData) {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Full name is required (at least 2 characters)';
  }
  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Company name is required';
  }
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Valid email address is required';
  }
  if (!data.phone || data.phone.trim().length < 7) {
    errors.phone = 'Valid phone number is required';
  }
  const validTypes = ['service', 'parts', 'both'];
  if (!validTypes.includes(data.requestType)) {
    errors.requestType = 'Please select a request type';
  }
  const validUrgency = ['Standard (1-2 weeks)', 'Urgent (3-5 days)', 'Emergency (24-48 hours)'];
  if (!validUrgency.includes(data.urgency)) {
    errors.urgency = 'Please select an urgency level';
  }

  return errors;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuoteFormData = await request.json();

    const errors = validateForm(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const trimmed = {
      name: body.name.trim(),
      company: body.company.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      country: body.country || null,
      request_type: body.requestType,
      service_category: body.serviceCategory || null,
      service_location: body.serviceLocation?.trim() || null,
      equipment_brand: body.equipmentBrand?.trim() || null,
      condition_preference: body.conditionPreference || null,
      part_description: body.partDescription?.trim() || null,
      vessel_name: body.vesselName?.trim() || null,
      imo_number: body.imoNumber?.trim() || null,
      urgency: body.urgency,
      additional_notes: body.additionalNotes?.trim() || null,
    };

    // Save to Supabase
    const { data: quoteData, error: dbError } = await supabase.from('quotations').insert(trimmed).select('id').single();

    if (dbError) {
      console.error('Supabase error:', dbError);
      return NextResponse.json(
        { success: false, message: 'Failed to save your request. Please try again.' },
        { status: 500 }
      );
    }

    // Build type label (needed for both conversation and email)
    const typeLabel =
      trimmed.request_type === 'service' ? 'Marine Services' :
      trimmed.request_type === 'parts' ? 'Spare Parts' : 'Both Services & Parts';

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
            subject: `Quote: ${typeLabel} — ${trimmed.company}`,
            status: 'open',
            source: 'quote_form',
            quotation_id: quoteData?.id || null,
            unread_count: 1,
          }, { onConflict: 'alias_id,external_email' })
          .select('id')
          .single();

        if (conv) {
          const msgBody = [
            `Quotation request from ${trimmed.name} (${trimmed.company})`,
            `Type: ${typeLabel}`,
            `Urgency: ${trimmed.urgency}`,
            trimmed.part_description ? `Parts: ${trimmed.part_description}` : '',
            trimmed.service_category ? `Service: ${trimmed.service_category}` : '',
            trimmed.additional_notes ? `Notes: ${trimmed.additional_notes}` : '',
          ].filter(Boolean).join('\n');

          await supabaseAdmin.from('messages').insert({
            conversation_id: conv.id,
            direction: 'inbound',
            sender_email: trimmed.email,
            sender_name: trimmed.name,
            recipient_email: 'admin@leon-international.com',
            subject: `Quote: ${typeLabel}`,
            body_text: msgBody,
            body_html: `<p>${msgBody.replace(/\n/g, '<br>')}</p>`,
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
      { label: 'Company', value: trimmed.company },
      { label: 'Email', value: trimmed.email },
      { label: 'Phone', value: trimmed.phone },
      ...(trimmed.country ? [{ label: 'Country', value: trimmed.country }] : []),
      { label: 'Request Type', value: typeLabel },
      ...(trimmed.service_category ? [{ label: 'Service Category', value: trimmed.service_category }] : []),
      ...(trimmed.service_location ? [{ label: 'Service Location', value: trimmed.service_location }] : []),
      ...(trimmed.equipment_brand ? [{ label: 'Equipment Brand', value: trimmed.equipment_brand }] : []),
      ...(trimmed.condition_preference ? [{ label: 'Condition Preference', value: trimmed.condition_preference }] : []),
      ...(trimmed.part_description ? [{ label: 'Part Description', value: trimmed.part_description }] : []),
      ...(trimmed.vessel_name ? [{ label: 'Vessel / Project', value: trimmed.vessel_name }] : []),
      ...(trimmed.imo_number ? [{ label: 'IMO Number', value: trimmed.imo_number }] : []),
      { label: 'Urgency', value: trimmed.urgency },
      ...(trimmed.additional_notes ? [{ label: 'Additional Notes', value: trimmed.additional_notes }] : []),
    ];

    // Admin email
    const adminHtml = generateEmailTemplate({
      recipientName: 'Admin',
      heading: 'New Quotation Request',
      message: `You have received a new quotation request from <strong>${trimmed.name}</strong> at <strong>${trimmed.company}</strong>. Here are the details:`,
      sections,
    });

    // Client email
    const clientSections = [
      { label: 'Request Type', value: typeLabel },
      { label: 'Urgency', value: trimmed.urgency },
      ...(trimmed.service_category ? [{ label: 'Service Category', value: trimmed.service_category }] : []),
      ...(trimmed.equipment_brand ? [{ label: 'Equipment Brand', value: trimmed.equipment_brand }] : []),
      ...(trimmed.vessel_name ? [{ label: 'Vessel / Project', value: trimmed.vessel_name }] : []),
    ];

    const clientHtml = generateEmailTemplate({
      recipientName: trimmed.name,
      heading: 'Your Quotation Request Has Been Received',
      message:
        'Thank you for requesting a quote from Leon International. Our technical team is reviewing your requirements and will respond with a comprehensive quotation within 24 hours.',
      sections: clientSections,
      contactActions: {
        phone: '+923132277773',
        whatsappMessage: `Hi Leon International, I recently submitted a quotation request (${typeLabel}) and would like to follow up.`,
      },
    });

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail({
        from: `"Leon International" <${ADMIN_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: `New Quote: ${typeLabel} — ${trimmed.name} (${trimmed.company})`,
        html: adminHtml,
      }),
      transporter.sendMail({
        from: `"Leon International" <${ADMIN_EMAIL}>`,
        to: trimmed.email,
        subject: 'Your quotation request — Leon International',
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
