// Single-file Vercel serverless handler — do not split into sub-imports.

type InquiryPayload = {
  name: string
  phone: string
  email: string
  service: string
  message: string
}

type ContactRequestBody = {
  name?: unknown
  phone?: unknown
  email?: unknown
  service?: unknown
  message?: unknown
  company?: unknown
}

type ContactHandlerResult = {
  status: number
  body: { ok: true } | { ok: false; error: string }
}

type JsonResponse = {
  status: (code: number) => { json: (body: unknown) => void }
}

type ApiRequest = {
  method?: string
  body?: unknown
}

const ALLOWED_SERVICES = new Set(['Roofing', 'Remodeling', 'Plumbing', 'HVAC', 'Other'])
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
      const data = (await response.json()) as { message?: string }
      if (data.message) message = data.message
    } catch {
      // keep default message
    }
    throw new Error(message)
  }
}

async function sendInquiryEmails(payload: InquiryPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  const from = resolveFromAddress()
  const notifyTo = process.env.INQUIRY_NOTIFY_EMAIL?.trim() ?? 'abcsconst@gmail.com'

  await sendResendEmail({
    apiKey,
    from,
    to: notifyTo,
    replyTo: payload.email,
    subject: `New inquiry: ${payload.service} — ${payload.name}`,
    html: buildMarioEmail(payload),
  })

  if (payload.email.toLowerCase() === notifyTo.toLowerCase()) {
    return
  }

  try {
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

function asTrimmedString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed || trimmed.length > maxLength) return null
  return trimmed
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function parsePayload(body: ContactRequestBody): InquiryPayload | null {
  const name = asTrimmedString(body.name, 120)
  const phone = asTrimmedString(body.phone, 40)
  const email = asTrimmedString(body.email, 160)
  const service = asTrimmedString(body.service, 40)
  const message = asTrimmedString(body.message, 4000)

  if (!name || !phone || !email || !service || !message) return null
  if (!isValidEmail(email)) return null
  if (!ALLOWED_SERVICES.has(service)) return null

  return { name, phone, email, service, message }
}

export function parseContactBody(raw: unknown): ContactRequestBody {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as ContactRequestBody
    } catch {
      return {}
    }
  }

  if (raw && typeof raw === 'object') {
    return raw as ContactRequestBody
  }

  return {}
}

export async function handleContactPost(body: ContactRequestBody): Promise<ContactHandlerResult> {
  if (typeof body.company === 'string' && body.company.trim()) {
    return { status: 200, body: { ok: true } }
  }

  const payload = parsePayload(body)
  if (!payload) {
    return { status: 400, body: { ok: false, error: 'Please check the form and try again.' } }
  }

  try {
    await sendInquiryEmails(payload)
    return { status: 200, body: { ok: true } }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to send email'
    console.error('[contact] Email send failed:', message)

    if (message.includes('RESEND_API_KEY')) {
      return {
        status: 503,
        body: { ok: false, error: 'Email service is not configured yet. Please call us directly.' },
      }
    }

    return {
      status: 502,
      body: { ok: false, error: message },
    }
  }
}

export default async function handler(req: ApiRequest, res: JsonResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({
      ok: true,
      service: 'contact',
      resendConfigured: Boolean(process.env.RESEND_API_KEY?.trim()),
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = parseContactBody(req.body)
  const result = await handleContactPost(body)
  return res.status(result.status).json(result.body)
}
