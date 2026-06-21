import type { Handler } from '@netlify/functions'
import { handleContactPost, parseContactBody } from '../../lib/contact/handleContactPost'

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

  try {
    const body = parseContactBody(event.body)
    const result = await handleContactPost(body)

    return {
      statusCode: result.status,
      headers,
      body: JSON.stringify(result.body),
    }
  } catch (error) {
    console.error('[contact] Unhandled error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        ok: false,
        error: 'Something went wrong on our end. Please call us at 409-999-0600.',
      }),
    }
  }
}
