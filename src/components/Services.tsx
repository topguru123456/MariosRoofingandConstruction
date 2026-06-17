import { ArrowRight, Check, Droplet, Hammer, Home, Wind, type LucideIcon } from 'lucide-react'
import { services } from '../content/siteContent'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const iconMap: Record<(typeof services)[number]['icon'], LucideIcon> = {
  home: Home,
  hammer: Hammer,
  droplet: Droplet,
  wind: Wind,
}

export function Services() {
  return (
    <section id="services" className="pitch-top bg-cream py-20 sm:py-24">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            eyebrow="What We Do"
            title="Services Built for Gulf Coast Homes"
            description="From roof repairs and storm damage to bathroom remodels, outdoor spaces, plumbing, and HVAC — we handle the job from start to finish."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <Reveal key={service.id} delay={index * 0.06} direction="scale">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy/8 bg-white shadow-[0_8px_30px_rgba(19,32,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_16px_40px_rgba(19,32,46,0.1)]">
                  <div className="h-1 bg-gold/80 transition-colors group-hover:bg-gold" />

                  <div className="flex flex-1 flex-col gap-5 p-6 sm:flex-row sm:gap-6 sm:p-7">
                    <div className="flex shrink-0 items-start">
                      <div className="rounded-xl bg-gold/12 p-4 text-gold-deep ring-1 ring-gold/20">
                        <Icon className="h-8 w-8" strokeWidth={1.6} aria-hidden />
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <h3 className="font-display text-[22px] font-bold text-navy">{service.title}</h3>
                      <p className="mt-2 text-[16px] leading-relaxed text-slate-soft">
                        {service.description}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {service.highlights.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2.5 text-[15px] font-medium text-navy/85"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-deep">
                              <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#contact"
                        className="focus-ring mt-5 inline-flex items-center gap-1.5 self-start rounded-sm text-[14px] font-semibold text-gold-deep transition-colors group-hover:gap-2.5 hover:text-navy"
                      >
                        Get a quote
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
