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
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=Mario's Roofing & Construction <inquiries@mariosroofingandconstruction.com>
INQUIRY_NOTIFY_EMAIL=abcsconst@gmail.com
```

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical URL, Open Graph tags, JSON-LD schema |
| `RESEND_API_KEY` | Resend API key (server-side only — **never** `VITE_` prefix) |
| `RESEND_FROM_EMAIL` | Verified sender address in Resend |
| `INQUIRY_NOTIFY_EMAIL` | Mario’s inbox for new form submissions (default: `abcsconst@gmail.com`) |

Set the same variables in your host’s dashboard when deploying.

### Contact form emails (Resend)

Submitting the contact form sends **two emails**:

1. **Mario** — new inquiry details (`INQUIRY_NOTIFY_EMAIL`), with reply-to set to the customer
2. **Customer** — confirmation that the inquiry was received

The API route is `/api/contact`. Deploy configs are included for **Netlify** (`netlify.toml`) and **Vercel** (`api/contact.ts` + `vercel.json`). Local `npm run dev` handles the same route via a Vite dev middleware.

**Resend setup:** verify your domain in Resend, then set `RESEND_FROM_EMAIL` to an address on that domain (e.g. `inquiries@mariosroofingandconstruction.com`). Until the domain is verified, Resend’s test sender only works for limited testing.

## Project structure

```
├── assets/              # Original photos (bath, cert, meet Mario, etc.)
├── roof pics/           # Roof portfolio originals
├── additional/          # New assets from Mario (owner photos, credentials)
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

1. Drop originals into `assets/`, `roof pics/`, or `additional/`.
2. Add a mapping in `scripts/copy-assets.mjs`.
3. Reference the public path in `siteContent.ts` (e.g. `/images/gallery-roof-crew-on-site.jpeg`).
4. Run `npm run copy-assets`.

See `public/images/ASSETS.md` for the current filename map.

## Pre-launch checklist

- [ ] Add `RESEND_API_KEY` and verify domain in Resend
- [ ] Set `RESEND_FROM_EMAIL` to a verified domain address
- [ ] Confirm `INQUIRY_NOTIFY_EMAIL` is `abcsconst@gmail.com` (or Mario’s preferred inbox)
- [ ] Confirm `VITE_SITE_URL` matches production domain
- [ ] Point DNS at your static host (replace GoDaddy “Launching Soon” page)
- [ ] Set `www` → apex redirect (pick one canonical version)
- [ ] Refresh Facebook/LinkedIn link preview after deploy
## License

Private — © Mario's Roofing & Construction. All rights reserved.
