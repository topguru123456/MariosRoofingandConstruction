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
| `meet-mario-owner-sign.jpeg` | `IMG_2304.jpeg` | Meet Mario — primary (yard sign) |
| `meet-mario-on-site.jpeg` | `IMG_2219.jpeg` | Meet Mario — inset (on-site, cropped) |

## Adding new images

1. Drop the original into `/assets`.
2. Add a mapping in `scripts/copy-assets.mjs`.
3. Reference the public path in `src/content/siteContent.ts`.
4. Run `npm run copy-assets`.

## Placeholders (v1)

- **Roofing gallery tile** — configured in `siteContent.ts` (no image file yet).
- **Testimonials** — `testimonials.enabled = false` until real reviews are added.
