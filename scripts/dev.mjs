import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const vite = join(root, 'node_modules', 'vite', 'bin', 'vite.js')

const child = spawn(process.execPath, [vite], { cwd: root, stdio: 'inherit', shell: false })
child.on('exit', (code) => process.exit(code ?? 0))
