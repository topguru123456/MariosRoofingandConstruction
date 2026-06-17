import { MapPin, Phone } from 'lucide-react'
import { serviceAreas, serviceAreasSection, site } from '../content/siteContent'
import { GulfCoastMap } from './GulfCoastMap'
import { CtaButton } from './ui/CtaButton'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function ServiceAreas() {
  return (
    <section id="areas" className="bg-cream py-20 sm:py-24">
      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <SectionHeader
                eyebrow="Where We Work"
                title="Service Areas"
                description="Reliable home improvement services across Houston, Galveston, and surrounding Gulf Coast communities."
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-8 flex overflow-hidden rounded-xl border border-navy/8 bg-white shadow-sm sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none">
                {serviceAreasSection.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex min-w-0 flex-1 flex-col items-center px-2 py-3.5 text-center sm:rounded-xl sm:border sm:border-navy/8 sm:bg-white sm:px-3 sm:py-4 sm:shadow-sm ${
                      index > 0 ? 'border-l border-navy/8 sm:border-l-0' : ''
                    }`}
                  >
                    <div className="flex min-h-[2.75rem] items-center justify-center sm:min-h-0">
                      <p className="font-display text-[14px] leading-tight font-bold text-gold-deep min-[380px]:text-[16px] sm:text-[22px] sm:leading-none">
                        {stat.value}
                      </p>
                    </div>
                    <p className="mt-1.5 max-w-[6.5rem] text-[10px] leading-snug font-medium text-slate-soft min-[380px]:max-w-none min-[380px]:text-[11px] sm:mt-1 sm:text-[13px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {serviceAreas.map((area, index) => (
                <Reveal key={area} delay={index * 0.03} direction="none">
                  <span className="inline-flex w-full items-center gap-2 rounded-lg border border-navy/10 bg-white px-3 py-2.5 text-[14px] font-semibold text-navy shadow-sm transition-colors hover:border-gold hover:bg-gold/5 sm:text-[15px]">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-deep" aria-hidden />
                    {area}
                  </span>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-slate-soft">
                <span>Texas: {site.phones.texas.number}</span>
                <span className="hidden h-3 w-px bg-navy/15 sm:block" aria-hidden />
                <span>Florida: {site.phones.florida.number}</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(19,32,46,0.15)] sm:min-h-[420px]">
              <img
                src={serviceAreasSection.image}
                alt={serviceAreasSection.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/20" />

              <GulfCoastMap className="absolute inset-0 h-full w-full p-8 text-gold opacity-90" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-display text-[22px] font-bold text-cream sm:text-[26px]">
                  Proudly serving the Gulf Coast
                </p>
                <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-cream/80">
                  From Houston metro to Galveston Island and every community in between.
                </p>
                <CtaButton
                  href={site.phones.texas.href}
                  size="sm"
                  icon={<Phone className="h-4 w-4" aria-hidden />}
                  className="mt-4"
                >
                  Call {site.phones.texas.number}
                </CtaButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
