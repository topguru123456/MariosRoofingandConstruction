import type { Handler } from '@netlify/functions'
import { handleContactPost, parseContactBody } from '../../api/lib/contact/handleContactPost'

const headers = {
  'Content-Type': 'application/json',
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    }
  }

  const body = parseContactBody(event.body)
  const result = await handleContactPost(body)

  return {
    statusCode: result.status,
    headers,
    body: JSON.stringify(result.body),
  }
}
