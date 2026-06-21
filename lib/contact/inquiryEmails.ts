export type InquiryPayload = {
  name: string
  phone: string
  email: string
  service: string
  message: string
}

const COMPANY = "Mario's Roofing & Construction"
const SITE_URL = process.env.VITE_SITE_URL ?? 'https://mariosroofingandconstruction.com'
const TEXAS_PHONE = '409-999-0600'
const FLORIDA_PHONE = '561-377-5260'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function emailShell(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#faf6ee;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#13202e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf6ee;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid rgba(19,32,46,0.08);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:4px;background:#f2b40a;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 8px;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#d99a06;">${COMPANY}</p>
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px;">
              <p style="margin:0;font-size:12px;line-height:1.6;color:#5c6b78;">
                Texas: ${TEXAS_PHONE} · Florida: ${FLORIDA_PHONE}<br />
                <a href="${SITE_URL}" style="color:#13202e;">${SITE_URL.replace(/^https?:\/\//, '')}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildMarioEmail(payload: InquiryPayload): string {
  const rows = [
    ['Name', payload.name],
    ['Phone', payload.phone],
    ['Email', payload.email],
    ['Service', payload.service],
    ['Message', payload.message],
  ]

  const detailRows = rows
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 0 4px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#5c6b78;">${escapeHtml(label)}</td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;font-size:16px;line-height:1.5;color:#13202e;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join('')

  return emailShell(
    `New inquiry from ${payload.name}`,
    `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#13202e;">New project inquiry</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5c6b78;">Someone submitted the contact form on your website. Reply directly to this email to reach them.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">${detailRows}</table>`,
  )
}

function buildCustomerEmail(payload: InquiryPayload): string {
  return emailShell(
    'We received your inquiry',
    `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.25;color:#13202e;">We got your message, ${escapeHtml(payload.name.split(' ')[0] || payload.name)}</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#5c6b78;">
      Thanks for contacting ${COMPANY}. Your inquiry was received and our team will follow up soon — usually the same business day.
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#5c6b78;">
      <strong style="color:#13202e;">What you sent us</strong><br />
      Service: ${escapeHtml(payload.service)}<br />
      Phone: ${escapeHtml(payload.phone)}
    </p>
    <p style="margin:0;font-size:15px;line-height:1.7;color:#5c6b78;">
      Need help sooner? Call us at <strong style="color:#13202e;">${TEXAS_PHONE}</strong> (Texas) or <strong style="color:#13202e;">${FLORIDA_PHONE}</strong> (Florida).
    </p>`,
  )
}

function resolveFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim()
  if (configured) return configured
  return 'Marios Roofing <onboarding@resend.dev>'
}

type ResendApiError = {
  message?: string
}

async function sendResendEmail(input: {
  apiKey: string
  from: string
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: input.from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      reply_to: input.replyTo,
    }),
  })

  if (!response.ok) {
    let message = `Resend HTTP ${response.status}`
    try {
      const data = (await response.json()) as { message?: string; error?: ResendApiError }
      message = data.message ?? data.error?.message ?? message
    } catch {
      // keep default message
    }
    throw new Error(message)
  }
}

export async function sendInquiryEmails(payload: InquiryPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is missing')
    throw new Error('RESEND_API_KEY is not configured')
  }

  const from = resolveFromAddress()
  const notifyTo = process.env.INQUIRY_NOTIFY_EMAIL?.trim() ?? 'abcsconst@gmail.com'

  console.info('[contact] Sending owner notification to', notifyTo)

  await sendResendEmail({
    apiKey,
    from,
    to: notifyTo,
    replyTo: payload.email,
    subject: `New inquiry: ${payload.service} — ${payload.name}`,
    html: buildMarioEmail(payload),
  })

  if (payload.email.toLowerCase() === notifyTo.toLowerCase()) {
    console.info('[contact] Skipping customer confirmation — same as notify address')
    return
  }

  try {
    console.info('[contact] Sending customer confirmation to', payload.email)
    await sendResendEmail({
      apiKey,
      from,
      to: payload.email,
      subject: `We received your inquiry — ${COMPANY}`,
      html: buildCustomerEmail(payload),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Customer email failed'
    console.warn('[contact] Customer confirmation failed:', message)
  }
}
