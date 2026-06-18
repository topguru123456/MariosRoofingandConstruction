import { sendInquiryEmails, type InquiryPayload } from './inquiryEmails'

const ALLOWED_SERVICES = new Set(['Roofing', 'Remodeling', 'Plumbing', 'HVAC', 'Other'])

type ContactRequestBody = {
  name?: unknown
  phone?: unknown
  email?: unknown
  service?: unknown
  message?: unknown
  company?: unknown
}

export type ContactHandlerResult = {
  status: number
  body: { ok: true } | { ok: false; error: string }
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
    console.error('[contact]', message)

    if (message.includes('RESEND_API_KEY')) {
      return {
        status: 503,
        body: { ok: false, error: 'Email service is not configured yet. Please call us directly.' },
      }
    }

    return {
      status: 502,
      body: { ok: false, error: 'We could not send your message right now. Please call us directly.' },
    }
  }
}
