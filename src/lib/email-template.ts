interface EmailSection {
  label: string;
  value: string;
}

interface ContactAction {
  phone: string;
  whatsappMessage?: string;
}

interface EmailTemplateOptions {
  recipientName: string;
  heading: string;
  message: string;
  sections?: EmailSection[];
  ctaText?: string;
  ctaUrl?: string;
  footerNote?: string;
  contactActions?: ContactAction;
}

export function generateEmailTemplate(options: EmailTemplateOptions): string {
  const {
    recipientName,
    heading,
    message,
    sections = [],
    ctaText,
    ctaUrl,
    footerNote,
    contactActions,
  } = options;

  const sectionsHtml = sections.length > 0
    ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0 0 0; border-collapse: collapse; border: 1px solid #D6EAF8; border-radius: 8px; overflow: hidden;">
        <thead>
          <tr>
            <th style="padding: 10px 16px; background-color: #0E2F44; font-size: 12px; font-weight: 600; color: #AED6F1; text-align: left; text-transform: uppercase; letter-spacing: 0.5px; width: 130px; border-bottom: 2px solid #E67E22;">Field</th>
            <th style="padding: 10px 16px; background-color: #0E2F44; font-size: 12px; font-weight: 600; color: #AED6F1; text-align: left; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #E67E22;">Details</th>
          </tr>
        </thead>
        <tbody>
          ${sections
      .map(
        (s, i) => `
          <tr>
            <td style="padding: 11px 16px; font-size: 13px; font-weight: 600; color: #1A5276; background-color: ${i % 2 === 0 ? '#F7FBFE' : '#ffffff'}; border-bottom: 1px solid #EBF5FB; vertical-align: top;">${s.label}</td>
            <td style="padding: 11px 16px; font-size: 14px; color: #1a2332; line-height: 1.6; background-color: ${i % 2 === 0 ? '#F7FBFE' : '#ffffff'}; border-bottom: 1px solid #EBF5FB; vertical-align: top;">${s.value}</td>
          </tr>`
      )
      .join('')}
        </tbody>
      </table>`
    : '';

  const ctaHtml = ctaText && ctaUrl
    ? `<div style="text-align: center; margin: 28px 0 8px 0;">
        <a href="${ctaUrl}" style="display: inline-block; background-color: #E67E22; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 8px; letter-spacing: 0.3px;">
          ${ctaText}
        </a>
      </div>`
    : '';

  const footerNoteHtml = footerNote
    ? `<p style="font-size: 13px; color: #5D6D7E; text-align: center; margin: 16px 0 0 0; line-height: 1.5;">${footerNote}</p>`
    : '';

  const whatsappUrl = contactActions
    ? `https://wa.me/${contactActions.phone.replace(/[^0-9]/g, '')}${contactActions.whatsappMessage ? `?text=${encodeURIComponent(contactActions.whatsappMessage)}` : ''}`
    : '';

  const contactActionsHtml = contactActions
    ? `<div style="margin: 24px 0 4px 0; text-align: center;">
        <p style="font-size: 13px; color: #5D6D7E; margin: 0 0 16px 0;">Need immediate assistance?</p>
        <table cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
            <td style="padding-right: 10px;">
              <a href="tel:${contactActions.phone}" style="display: inline-block; background-color: #1A5276; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 8px;">&#9742;&ensp;Call Us</a>
            </td>
            <td style="padding-left: 10px;">
              <a href="${whatsappUrl}" style="display: inline-block; background-color: #25D366; color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 10px 22px; border-radius: 8px;" target="_blank">&#9993;&ensp;WhatsApp</a>
            </td>
          </tr>
        </table>
      </div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F0F4F8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F0F4F8; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0E2F44 0%, #1A5276 100%); padding: 32px 36px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">Leon International</h1>
              <div style="width: 40px; height: 3px; background-color: #E67E22; margin: 10px auto 0 auto; border-radius: 2px;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color: #ffffff; padding: 36px 36px 28px 36px;">
              <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #0E2F44;">${heading}</h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #5D6D7E;">Hi ${recipientName},</p>
              <p style="margin: 0; font-size: 14px; color: #3a4a5c; line-height: 1.7;">${message}</p>

              ${sectionsHtml}
              ${ctaHtml}
              ${contactActionsHtml}
              ${footerNoteHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0E2F44; padding: 24px 36px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #AED6F1;">Leon International &mdash; Marine Engineering & Ship Spare Parts</p>
              <p style="margin: 0 0 12px 0; font-size: 12px; color: #5D6D7E;">C-102 Block 4 Gulshan-E-Iqbal Karachi, Pakistan</p>
              <div style="border-top: 1px solid #1A5276; padding-top: 12px;">
                <a href="https://leon-international.com" style="font-size: 12px; color: #E67E22; text-decoration: none; font-weight: 600;">leon-international.com</a>
                <span style="color: #1A5276; margin: 0 8px;">&bull;</span>
                <a href="mailto:info@leon-international.com" style="font-size: 12px; color: #AED6F1; text-decoration: none;">info@leon-international.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
