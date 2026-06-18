import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleContactPost } from '../server/handleContactPost'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const result = await handleContactPost(req.body ?? {})
  return res.status(result.status).json(result.body)
}
