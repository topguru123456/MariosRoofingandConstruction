import { navLinks, site } from '../content/siteContent'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-deep py-14 text-cream">
      <div className="section-container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <img
              src="/images/logo.png"
              alt={site.name}
              className="h-16 w-auto sm:h-[4.5rem]"
              width={160}
              height={64}
            />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-cream/70">
              Reliable home improvement across Houston, Galveston, and the Gulf Coast.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[14px] font-semibold tracking-wide text-gold uppercase">
              Quick Links
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="focus-ring-dark rounded-sm text-[15px] text-cream/75 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[14px] font-semibold tracking-wide text-gold uppercase">
              Contact
            </p>
            <div className="space-y-2 text-[15px] text-cream/75">
              <a
                href={site.phones.texas.href}
                className="focus-ring-dark block rounded-sm transition-colors hover:text-gold"
              >
                {site.phones.texas.label}: {site.phones.texas.number}
              </a>
              <a
                href={site.phones.florida.href}
                className="focus-ring-dark block rounded-sm transition-colors hover:text-gold"
              >
                {site.phones.florida.label}: {site.phones.florida.number}
              </a>
              <a
                href={site.emailHref}
                className="focus-ring-dark block rounded-sm transition-colors hover:text-gold"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-[14px] text-cream/55">
          © {year} {site.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  )
}
