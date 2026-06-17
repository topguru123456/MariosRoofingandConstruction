import { Phone } from 'lucide-react'
import { site } from '../content/siteContent'

export function MobileCallBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-white/10 bg-navy/20 shadow-[0_-4px_24px_rgba(0,0,0,0.28)] backdrop-blur-sm lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="Quick contact"
    >
      <a
        href={site.phones.texas.href}
        className="focus-ring-dark flex items-center justify-center gap-2 bg-navy px-3 py-3.5 text-[14px] font-semibold text-cream transition-colors hover:bg-navy-deep active:bg-navy-deep"
      >
        <Phone className="h-[18px] w-[18px] shrink-0 text-gold" strokeWidth={2} aria-hidden />
        Call Mario
      </a>
      <a
        href="#contact"
        className="focus-ring-white cta-shimmer flex items-center justify-center gap-2 bg-gold px-3 py-3.5 text-[14px] font-semibold tracking-wide text-navy uppercase transition-colors hover:bg-gold-deep active:bg-gold-deep"
      >
        Free Quote
      </a>
    </div>
  )
}
