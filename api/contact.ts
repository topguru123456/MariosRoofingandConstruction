import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleContactPost, parseContactBody } from '../lib/contact/handleContactPost'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const body = parseContactBody(req.body)
    const result = await handleContactPost(body)
    return res.status(result.status).json(result.body)
  } catch (error) {
    console.error('[contact] Unhandled error:', error)
    return res.status(500).json({
      ok: false,
      error: 'Something went wrong on our end. Please call us at 409-999-0600.',
    })
  }
}
