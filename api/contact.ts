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

  try {
    console.info('[contact] POST received')

    const { parseContactBody, handleContactPost } = await import('../lib/contact/handleContactPost')
    const body = parseContactBody(req.body)
    const result = await handleContactPost(body)

    console.info('[contact] Result status', result.status)
    return res.status(result.status).json(result.body)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[contact] Unhandled error:', message, error)
    return res.status(500).json({
      ok: false,
      error: 'Something went wrong on our end. Please call us at 409-999-0600.',
    })
  }
}
