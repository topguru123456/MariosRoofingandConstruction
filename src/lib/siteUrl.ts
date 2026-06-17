/** Canonical origin from VITE_SITE_URL — no trailing slash. */
export const siteUrl = import.meta.env.VITE_SITE_URL.replace(/\/$/, '')
