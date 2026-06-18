import type { Handler } from '@netlify/functions'
import { handleContactPost } from '../../server/handleContactPost'

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

  let body: Record<string, unknown> = {}

  try {
    body = event.body ? JSON.parse(event.body) : {}
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ ok: false, error: 'Invalid request body' }),
    }
  }

  const result = await handleContactPost(body)

  return {
    statusCode: result.status,
    headers,
    body: JSON.stringify(result.body),
  }
}
