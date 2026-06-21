import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { parseContactBody, handleContactPost } from './api/lib/contact/handleContactPost'

function contactApiPlugin(env: Record<string, string>): Plugin {
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value
    }
  }

  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/api/contact' || req.method !== 'POST') {
          next()
          return
        }

        const chunks: Buffer[] = []

        req.on('data', (chunk) => {
          chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
        })

        req.on('end', async () => {
          try {
            const raw = Buffer.concat(chunks).toString('utf8')
            const body = parseContactBody(raw)
            const result = await handleContactPost(body)

            res.statusCode = result.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result.body))
          } catch {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Server error' }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), contactApiPlugin(env)],
  }
})
