import { motion } from 'framer-motion'
import { Award, Camera, CheckCircle2, Shield } from 'lucide-react'
import { whyChooseUs } from '../content/siteContent'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { easeOut } from '../lib/motion'
import { Reveal } from './ui/Reveal'

const highlightIcons = {
  shield: Shield,
  camera: Camera,
} as const

function TrustBadge({
  title,
  detail,
  icon: Icon,
  delay = 0,
  tilt = 0,
}: {
  title: string
  detail: string
  icon: typeof Shield
  delay?: number
  tilt?: number
}) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div
      className="trust-badge-seal flex w-[7.5rem] flex-col items-center sm:w-[8.5rem]"
      style={{ rotate: `${tilt}deg` }}
      initial={reduced ? false : { opacity: 0, y: 20, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
    >
      <div className="trust-badge-ring relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-gold/30 bg-navy-deep/70 shadow-[inset_0_0_28px_rgba(242,180,10,0.08),0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-transform hover:scale-105 sm:h-24 sm:w-24">
        <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gold/12 ring-1 ring-gold/30">
          <Icon className="h-6 w-6 text-gold" strokeWidth={1.7} aria-hidden />
        </span>
      </div>

      <p className="mt-3 text-center font-display text-[13px] leading-tight font-bold text-cream sm:text-[14px]">
        {title}
      </p>
      <p className="mt-1 text-center text-[11px] leading-snug text-cream/55 sm:text-[12px]">{detail}</p>
    </motion.div>
  )
}

function CertificateShowcase() {
  const { certificate } = whyChooseUs
  const reduced = usePrefersReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -right-3 -bottom-5 h-full w-[88%] rounded-2xl bg-gold/12 sm:-right-5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-2 top-6 h-[70%] w-[75%] rounded-2xl border border-cream/8 bg-cream/[0.04]"
        aria-hidden
      />

      <figure className="relative rotate-[0.75deg] overflow-hidden rounded-xl border border-white/12 bg-white shadow-[0_28px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-center justify-between gap-3 border-b border-navy/8 bg-cream px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-gold-deep" aria-hidden />
            <span className="text-[11px] font-bold tracking-[0.12em] text-navy uppercase sm:text-[12px]">
              {certificate.badge}
            </span>
          </div>
          <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold tracking-wide text-gold uppercase">
            2028
          </span>
        </div>

        <div className="bg-gradient-to-b from-slate-50 to-white p-3 sm:p-4">
          <img
            src={certificate.image}
            alt={certificate.alt}
            className="w-full rounded-sm object-contain shadow-[0_2px_12px_rgba(19,32,46,0.08)]"
            loading="lazy"
          />
        </div>

        <figcaption className="border-t border-navy/8 bg-navy px-4 py-3.5 sm:px-5">
          <p className="font-display text-[14px] font-bold text-cream sm:text-[15px]">
            {certificate.caption}
          </p>
          <p className="mt-0.5 text-[12px] font-medium text-cream/60">{certificate.recipient}</p>
          <p className="mt-1 text-[11px] font-semibold tracking-wide text-gold/90 uppercase">
            {certificate.validThrough}
          </p>
        </figcaption>
      </figure>

      <motion.div
        className={`verified-stamp absolute -top-3 -right-2 flex items-center gap-1.5 rounded border-2 border-gold bg-navy-deep px-3 py-1.5 shadow-lg sm:-right-4 ${reduced ? '!rotate-12' : ''}`}
        initial={reduced ? false : { opacity: 0, scale: 0.6, rotate: 24 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.65, ease: easeOut, delay: 0.35 }}
        aria-hidden
      >
        <CheckCircle2 className="h-3.5 w-3.5 text-gold" strokeWidth={2.5} />
        <p className="text-[9px] font-bold tracking-[0.14em] text-gold uppercase">Verified</p>
      </motion.div>
    </div>
  )
}

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div className="why-us-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="grain-overlay pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-gold/8 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-96 rounded-full bg-white/4 blur-3xl" aria-hidden />

      <div className="section-container relative">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="order-1 lg:col-span-5">
            <Reveal>
              <p className="eyebrow">{whyChooseUs.eyebrow}</p>
              <h2 className="font-display-expanded text-[34px] leading-[1.02] font-extrabold tracking-tight text-cream sm:text-[42px] lg:text-[48px]">
                {whyChooseUs.title}
                <span className="mt-1 block text-gold">{whyChooseUs.titleAccent}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <blockquote className="relative mt-6 border-l-[3px] border-gold/80 py-1 pl-5">
                <p className="text-[17px] leading-relaxed font-medium text-cream/88 sm:text-[18px]">
                  {whyChooseUs.intro}
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
                {whyChooseUs.stats.map((stat, index) => (
                  <div key={stat.label} className="flex items-center gap-5 sm:gap-6">
                    {index > 0 && <div className="hidden h-10 w-px bg-gold/25 sm:block" aria-hidden />}
                    <div>
                      <p className="font-display text-[20px] font-bold text-gold sm:text-[22px]">
                        {stat.value}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold tracking-[0.1em] text-cream/55 uppercase sm:text-[11px]">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="order-2 lg:col-span-7 lg:row-span-2 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.12} direction="scale">
              <CertificateShowcase />
            </Reveal>

            <div className="mt-8 flex flex-wrap items-start justify-center gap-8 sm:gap-10 lg:mt-10 lg:justify-end">
              {whyChooseUs.highlights.map((item, index) => {
                const Icon = highlightIcons[item.icon]
                return (
                  <TrustBadge
                    key={item.title}
                    title={item.title}
                    detail={item.detail}
                    icon={Icon}
                    delay={0.2 + index * 0.12}
                    tilt={index === 0 ? -4 : 4}
                  />
                )
              })}
            </div>
          </div>

          <div className="order-3 lg:col-span-5 lg:row-start-2">
            <ol className="space-y-0">
              {whyChooseUs.points.map((point, index) => (
                <Reveal key={point.id} delay={0.08 + index * 0.05}>
                  <li className="group grid grid-cols-[3.25rem_1fr] gap-3 border-t border-white/10 py-6 transition-colors hover:border-gold/20 first:border-t-0 sm:grid-cols-[4rem_1fr] sm:gap-4 sm:py-7">
                    <span
                      className="why-us-index font-display-expanded text-[40px] leading-none font-extrabold sm:text-[48px]"
                      aria-hidden
                    >
                      {point.id}
                    </span>
                    <div>
                      <h3 className="font-display text-[18px] font-bold text-cream transition-colors group-hover:text-gold sm:text-[19px]">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-cream/65 sm:text-[15px]">
                        {point.detail}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
