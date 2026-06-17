import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const sourceDir = join(root, 'assets')
const roofSourceDir = join(root, 'roof pics')
const targetDir = join(root, 'public', 'images')

/** @type {Array<{ source: string, target: string, from?: 'assets' | 'roof' }>} */
const assetMap = [
  { source: 'hero.png', target: 'hero-background.png' },
  { source: 'logo.png', target: 'logo.png' },
  { source: 'IMG_2344.jpeg', target: 'cert-certainteed-master-craftsman.jpeg' },
  { source: 'IMG_2271.jpeg', target: 'gallery-master-bath-finished-01.jpeg' },
  { source: 'IMG_2148.jpeg', target: 'gallery-shower-tile-install.jpeg' },
  { source: 'IMG_2079.jpeg', target: 'gallery-shower-backboard-framing.jpeg' },
  { source: 'IMG_2100.jpeg', target: 'gallery-shower-tile-in-progress.jpeg' },
  { source: 'IMG_2068.jpeg', target: 'gallery-wall-framing-insulation.jpeg' },
  { source: 'IMG_2195.jpeg', target: 'gallery-bath-remodel-prep.jpeg' },
  { source: 'IMG_2079.jpeg', target: 'before-after-shower-framing.jpeg' },
  { source: 'IMG_2271.jpeg', target: 'before-after-shower-finished.jpeg' },
  { source: 'IMG_2100.jpeg', target: 'before-after-tile-progress.jpeg' },
  { source: 'IMG_2272.jpeg', target: 'before-after-tile-finished.jpeg' },
  { source: 'IMG_2304.jpeg', target: 'meet-mario-owner-sign.jpeg' },
  { source: 'IMG_2219.jpeg', target: 'meet-mario-on-site.jpeg' },
  // Roof portfolio — curated from /roof pics
  { source: 'IMG_1755.jpeg', target: 'gallery-roof-finished-aerial.jpeg', from: 'roof' },
  { source: 'IMG_1735.jpeg', target: 'gallery-roof-crew-on-site.jpeg', from: 'roof' },
  { source: 'IMG_1751.jpeg', target: 'gallery-roof-certainteed-install.jpeg', from: 'roof' },
  { source: 'IMG_1722.jpeg', target: 'gallery-roof-underlayment-crew.jpeg', from: 'roof' },
  { source: 'IMG_2103.jpeg', target: 'gallery-roof-completed-residential.jpeg', from: 'roof' },
]

mkdirSync(targetDir, { recursive: true })

let copied = 0
for (const { source, target, from = 'assets' } of assetMap) {
  const sourcePath = join(from === 'roof' ? roofSourceDir : sourceDir, source)
  const targetPath = join(targetDir, target)

  if (!existsSync(sourcePath)) {
    console.warn(`Skipping missing source: ${source}`)
    continue
  }

  copyFileSync(sourcePath, targetPath)
  copied += 1
  console.log(`${source} -> images/${target}`)
}

console.log(`\nCopied ${copied} assets to public/images/`)
