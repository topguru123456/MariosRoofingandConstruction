# Image Assets

Source files live in `/assets` (original camera filenames).  
Build copies them here with clear names via `npm run copy-assets`.

| Public filename | Original source | Usage |
|---|---|---|
| `hero-background.png` | `hero.png` | Hero section background |
| `logo.png` | `logo.png` | Header & footer logo |
| `cert-certainteed-master-craftsman.jpeg` | `IMG_2344.jpeg` | Why Choose Us certificate |
| `gallery-master-bath-finished-01.jpeg` | `IMG_2271.jpeg` | Gallery + before/after |
| `gallery-master-bath-finished-02.jpeg` | `IMG_2272.jpeg` | Gallery + before/after |
| `gallery-shower-tile-install.jpeg` | `IMG_2148.jpeg` | Gallery |
| `gallery-shower-backboard-framing.jpeg` | `IMG_2079.jpeg` | Gallery + before/after |
| `gallery-shower-tile-in-progress.jpeg` | `IMG_2100.jpeg` | Gallery + before/after |
| `gallery-wall-framing-insulation.jpeg` | `IMG_2068.jpeg` | Gallery |
| `gallery-bath-remodel-prep.jpeg` | `IMG_2195.jpeg` | Gallery |
| `before-after-shower-framing.jpeg` | `IMG_2079.jpeg` | Before/after slider |
| `before-after-shower-finished.jpeg` | `IMG_2271.jpeg` | Before/after slider |
| `before-after-tile-progress.jpeg` | `IMG_2100.jpeg` | Before/after slider |
| `before-after-tile-finished.jpeg` | `IMG_2272.jpeg` | Before/after slider |
| `meet-mario-owner-sign.jpeg` | `additional/IMG_3316.jpeg` | Meet Mario — primary + Hero collage |
| `meet-mario-on-site.jpeg` | `IMG_2219.jpeg` | Meet Mario — inset (on-site, cropped) |
| `cert-master-craftsman-hat.jpeg` | `additional/IMG_2347.jpeg` | Why Choose Us — credential accent |
| `gallery-roof-finished-aerial.jpeg` | `roof pics/IMG_1755.jpeg` | Gallery + Service Areas |
| `gallery-roof-crew-on-site.jpeg` | `roof pics/IMG_1735.jpeg` | Gallery + Hero collage |
| `gallery-roof-certainteed-install.jpeg` | `roof pics/IMG_1751.jpeg` | Gallery |
| `gallery-roof-underlayment-crew.jpeg` | `roof pics/IMG_1722.jpeg` | Gallery |
| `gallery-project-commercial-replacement.jpeg` | `additional/IMG_3184.jpeg` | Gallery |
| `gallery-project-church-replacement.jpeg` | `additional/IMG_3178.jpeg` | Gallery |
| `gallery-project-commercial-crew.jpeg` | `additional/IMG_3095.jpeg` | Gallery |
| `gallery-project-church-site.jpeg` | `additional/IMG_3038.jpeg` | Gallery |
| `gallery-project-underlayment-install.jpeg` | `additional/IMG_3105.jpeg` | Gallery |
| `project-showcase.mp4` | `additional/IMG_2449.mov` (converted once) | Hero video modal (~16 MB) |
| `video-poster.jpg` | extracted from video | Hero video poster |

## Adding new images

1. Drop the original into `/assets`.
2. Add a mapping in `scripts/copy-assets.mjs`.
3. Reference the public path in `src/content/siteContent.ts`.
4. Run `npm run copy-assets`.

Videos live in `public/videos/`. The hero video is **lazy-loaded** — it only downloads when someone opens the modal.

To replace the hero video: convert a new clip to MP4 (H.264, `faststart`), overwrite `public/videos/project-showcase.mp4`, and update `public/images/video-poster.jpg` if needed.

## Placeholders (v1)

- **Testimonials** — `testimonials.enabled = false` until real reviews are added.
