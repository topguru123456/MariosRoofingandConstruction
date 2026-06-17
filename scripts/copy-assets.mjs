import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const sourceDir = join(root, 'assets')
const targetDir = join(root, 'public', 'images')

/** @type {Array<{ source: string, target: string }>} */
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
]

mkdirSync(targetDir, { recursive: true })

let copied = 0
for (const { source, target } of assetMap) {
  const sourcePath = join(sourceDir, source)
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
