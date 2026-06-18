import { ArrowRight, Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { headerLayout, navLinks, site } from '../content/siteContent'
import { useScrollHeader } from '../hooks/useScrollHeader'
import { CtaButton } from './ui/CtaButton'

function DesktopTopBar() {
  return (
    <div className="hidden border-b border-white/8 bg-navy-deep sm:block">
      <div className="section-container flex flex-wrap items-center justify-end gap-x-5 gap-y-2 py-2 text-[14px] text-cream/90">
        <a
          href={site.phones.texas.href}
          className="focus-ring-dark inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-gold"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{site.phones.texas.number}</span>
        </a>

        <span className="h-3.5 w-px bg-cream/25" aria-hidden />

        <a
          href={site.phones.florida.href}
          className="focus-ring-dark inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-gold"
        >
          <span>{site.phones.florida.number}</span>
        </a>

        <span className="hidden h-3.5 w-px bg-cream/25 sm:block" aria-hidden />

        <a
          href={site.emailHref}
          className="focus-ring-dark hidden items-center gap-1.5 rounded-sm transition-colors hover:text-gold xl:inline-flex"
        >
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{site.email}</span>
        </a>
      </div>
    </div>
  )
}

function logoHeightClass(scrolled: boolean) {
  if (scrolled) return 'h-11 sm:h-12 lg:h-14'
  return 'h-14 sm:h-16 lg:h-[88px] xl:h-[112px]'
}

function headerBarClass(scrolled: boolean) {
  if (scrolled) return 'min-h-[4.25rem] py-2.5 lg:min-h-[4.75rem] lg:py-2'
  return 'min-h-[4.25rem] py-2.5 lg:min-h-[6.5rem] lg:py-2.5 xl:min-h-[7.5rem] xl:py-3'
}

export function Header() {
  const scrolled = useScrollHeader()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navLinkClass =
    'focus-ring-dark rounded-sm text-[14px] font-semibold text-cream/90 transition-colors hover:text-gold xl:text-[15px]'

  const headerBg = scrolled
    ? 'bg-navy shadow-lg shadow-black/20'
    : 'bg-navy lg:bg-transparent lg:shadow-none'

  return (
    <>
      <div className="sticky top-0 z-50 w-full">
        <DesktopTopBar />

        <header
          className={`w-full transition-[background-color,box-shadow,min-height,padding] duration-300 ${headerBg} ${headerBarClass(scrolled)}`}
        >
          <div className="section-container flex h-full items-center justify-between gap-4">
            <a href="#" className="focus-ring-dark flex h-full shrink-0 items-center rounded-sm leading-none">
              <img
                src="/images/logo.png"
                alt={site.name}
                className={`block w-auto max-h-full max-w-[min(190px,50vw)] object-contain transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-w-none ${logoHeightClass(scrolled)}`}
                width={220}
                height={headerLayout.logoHeightDefault}
              />
            </a>

            <div className="hidden min-w-0 items-center gap-3 lg:flex xl:gap-10">
              <nav className="flex items-center gap-3 xl:gap-8" aria-label="Main">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className={navLinkClass}>
                    {link.label}
                  </a>
                ))}
              </nav>
              <CtaButton href="#contact" size="sm" showArrow>
                Get a Quote
              </CtaButton>
            </div>

            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <a
                href={site.phones.texas.href}
                className="focus-ring-dark inline-flex h-10 w-10 items-center justify-center rounded-md border border-cream/20 bg-white/5 text-gold transition-colors hover:border-gold/40 hover:bg-gold/10"
                aria-label={`Call ${site.phones.texas.number}`}
              >
                <Phone className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              </a>

              <button
                type="button"
                className="focus-ring-dark inline-flex h-10 w-10 items-center justify-center rounded-md border border-cream/20 bg-white/5 text-cream transition-colors hover:border-cream/35 hover:bg-white/10"
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-navy lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="border-b border-white/10 bg-navy-deep">
            <div className="section-container flex items-center justify-between gap-3 py-3">
              <a href="#" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
                <img
                  src="/images/logo.png"
                  alt={site.name}
                  className="h-12 w-auto max-w-[min(180px,48vw)]"
                  width={240}
                  height={48}
                />
              </a>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-cream/20 text-cream"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="section-container flex flex-1 flex-col py-5" aria-label="Mobile">
            <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <a
                href={site.emailHref}
                className="focus-ring-dark inline-flex items-center gap-2 rounded-sm text-[13px] text-cream/75 transition-colors hover:text-gold"
                onClick={() => setOpen(false)}
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {site.email}
              </a>
            </div>

            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="focus-ring-dark flex items-center justify-between rounded-sm border-b border-white/8 py-4 text-[17px] font-semibold text-cream transition-colors hover:text-gold"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-cream/35" aria-hidden />
                </a>
              ))}
            </div>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-6 pb-8">
              <a
                href={site.phones.texas.href}
                className="focus-ring-dark flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors hover:border-gold/30 hover:bg-white/[0.08]"
                onClick={() => setOpen(false)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[12px] font-medium text-cream/55">Texas line</span>
                  <span className="font-display text-[17px] font-bold text-cream">
                    {site.phones.texas.number}
                  </span>
                </span>
              </a>

              <a
                href={site.phones.florida.href}
                className="focus-ring-dark flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 transition-colors hover:border-gold/30 hover:bg-white/[0.08]"
                onClick={() => setOpen(false)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <Phone className="h-4 w-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-[12px] font-medium text-cream/55">Florida line</span>
                  <span className="font-display text-[17px] font-bold text-cream">
                    {site.phones.florida.number}
                  </span>
                </span>
              </a>

              <CtaButton
                href="#contact"
                showArrow
                className="w-full !py-3.5"
                onClick={() => setOpen(false)}
              >
                Get a Free Quote
              </CtaButton>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
