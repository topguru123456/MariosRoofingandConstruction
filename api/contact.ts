import { handleContactPost, parseContactBody } from './lib/contact/handleContactPost'

type JsonResponse = {
  status: (code: number) => { json: (body: unknown) => void }
}

type ApiRequest = {
  method?: string
  body?: unknown
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
