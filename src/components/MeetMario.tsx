import { Check } from 'lucide-react'
import { meetMario, site } from '../content/siteContent'
import { CtaButton } from './ui/CtaButton'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function MeetMario() {
  return (
    <section id="meet-mario" className="bg-white py-20 sm:py-24">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="scale">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-2xl border border-navy/8 bg-cream shadow-[0_20px_50px_rgba(19,32,46,0.1)]">
                <div className="relative aspect-[3/4] sm:aspect-[4/5]">
                  <img
                    src={meetMario.photos.primary.src}
                    alt={meetMario.photos.primary.alt}
                    className="owner-photo-primary absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="absolute -right-2 -bottom-6 h-28 w-28 overflow-hidden rounded-xl border-4 border-white shadow-lg sm:-right-4 sm:h-32 sm:w-32">
                <img
                  src={meetMario.photos.secondary.src}
                  alt={meetMario.photos.secondary.alt}
                  className="h-full w-full object-cover object-[22%_30%] scale-125"
                  loading="lazy"
                />
              </div>

              <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-slate-soft sm:mt-8">
                {meetMario.photos.caption}
              </p>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeader
                eyebrow={meetMario.eyebrow}
                title={meetMario.title}
                description={meetMario.description}
              />
            </Reveal>

            <ul className="mt-8 space-y-4">
              {meetMario.points.map((point, index) => (
                <Reveal key={point} delay={index * 0.06}>
                  <li className="flex items-start gap-3 text-[16px] font-medium text-navy/90">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                      <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
                    </span>
                    {point}
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton href="#contact" size="sm" showArrow>
                  Get a Free Quote
                </CtaButton>
                <CtaButton
                  href={site.phones.texas.href}
                  variant="secondary"
                  size="sm"
                  className="!border-navy/20 !text-navy hover:!border-navy/40 hover:!bg-cream"
                  shimmer={false}
                >
                  Call {site.phones.texas.number}
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
