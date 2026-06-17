# Mario's Roofing & Construction

One-page marketing site for **Mario's Roofing & Construction** — roofing, remodeling, plumbing, and HVAC across the Houston–Galveston Gulf Coast.

**Live domain:** [mariosroofingandconstruction.com](https://mariosroofingandconstruction.com)

## Stack

- [Vite](https://vitejs.dev/) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — scroll reveals & hero motion
- [Lucide](https://lucide.dev/) — icons
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com/) — gallery lightbox
- [react-compare-slider](https://www.npmjs.com/package/react-compare-slider) — before/after sliders

Static build output in `dist/` — deploy to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

## Quick start

```bash
npm install
npm run copy-assets
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

### Production build

```bash
npm run copy-assets
npm run build
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run copy-assets` | Copy source images into `public/images/` |

`dev` and `build` run through `scripts/*.mjs` so the project works when the folder path contains special characters (e.g. `&`).

## Environment

Copy `.env.example` to `.env` (already included for local dev):

```env
VITE_SITE_URL=https://mariosroofingandconstruction.com
```

Used for canonical URL, Open Graph tags, and JSON-LD schema. **No trailing slash.**

Set the same variable in your host’s dashboard when deploying.

## Project structure

```
├── assets/              # Original photos (bath, cert, meet Mario, etc.)
├── roof pics/           # Roof portfolio originals
├── public/images/       # Web-ready images (generated + committed)
├── scripts/
│   ├── copy-assets.mjs  # Maps sources → public/images
│   ├── dev.mjs
│   └── build.mjs
├── src/
│   ├── content/siteContent.ts   # All copy, images, nav, gallery config
│   ├── components/              # Page sections
│   ├── lib/                     # Motion helpers, site URL
│   └── index.css                # Design tokens & utilities
└── index.html                   # Meta tags, schema, font preload
```

## Editing content

Most site copy and image paths live in **`src/content/siteContent.ts`**:

- Business name, phones, email
- Hero, services, gallery, testimonials toggle
- Before/after pairs, service areas, contact form fields

Components read from that file — change content there first.

## Images

1. Drop originals into `assets/` or `roof pics/`.
2. Add a mapping in `scripts/copy-assets.mjs`.
3. Reference the public path in `siteContent.ts` (e.g. `/images/gallery-roof-crew-on-site.jpeg`).
4. Run `npm run copy-assets`.

See `public/images/ASSETS.md` for the current filename map.

## Pre-launch checklist

- [ ] Replace Formspree placeholder in `siteContent.ts` (`formEndpoint`)
- [ ] Confirm `VITE_SITE_URL` matches production domain
- [ ] Point DNS at your static host (replace GoDaddy “Launching Soon” page)
- [ ] Set `www` → apex redirect (pick one canonical version)
- [ ] Refresh Facebook/LinkedIn link preview after deploy
- [ ] Optional: compress large JPEGs to WebP for faster mobile load

## License

Private — © Mario's Roofing & Construction. All rights reserved.
