import { motion } from 'framer-motion'
import { Fragment } from 'react'
import { Phone } from 'lucide-react'
import { hero, site } from '../content/siteContent'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import {
  heroBody,
  heroCta,
  heroEyebrow,
  heroPhotoPrimary,
  heroPhotoSecondary,
  heroPill,
  heroStagger,
  heroTitle,
  heroTrustStrip,
  staggerFast,
} from '../lib/motion'
import { CtaButton } from './ui/CtaButton'

function HeroPhotoStack({ reduced }: { reduced: boolean }) {
  const [primary, secondary] = hero.showcasePhotos

  return (
    <div className="pointer-events-none absolute top-1/2 right-0 z-10 hidden w-[min(42vw,480px)] -translate-y-[42%] lg:block xl:right-[2%]">
      <motion.a
        href="#gallery"
        className="hero-photo-float pointer-events-auto absolute top-0 right-0 block w-[72%] overflow-hidden rounded-xl border border-white/20 bg-navy shadow-[0_28px_60px_rgba(0,0,0,0.45)]"
        variants={heroPhotoPrimary}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gold" aria-hidden />
        <img src={primary.src} alt={primary.alt} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-4 py-3">
          <p className="text-[11px] font-bold tracking-[0.12em] text-gold uppercase">{primary.caption}</p>
        </div>
      </motion.a>

      <motion.a
        href="#meet-mario"
        className="hero-photo-float hero-photo-float-delayed pointer-events-auto absolute -bottom-10 left-0 block w-[58%] overflow-hidden rounded-xl border-4 border-navy shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
        variants={heroPhotoSecondary}
        initial={reduced ? false : 'hidden'}
        animate="visible"
      >
        <img
          src={secondary.src}
          alt={secondary.alt}
          className="aspect-[4/5] w-full object-cover object-[22%_30%] scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 bg-navy/85 px-3 py-2">
          <p className="text-[10px] font-bold tracking-[0.1em] text-cream/80 uppercase">{secondary.caption}</p>
        </div>
      </motion.a>
    </div>
  )
}

function HeroTrustBar({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative z-20 mt-6 border-t border-white/10 bg-navy/75 backdrop-blur-md sm:mt-8 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0"
      variants={heroTrustStrip}
      initial={reduced ? false : 'hidden'}
      animate="visible"
    >
      <div className="section-container flex flex-col divide-y divide-white/10 sm:flex-row sm:items-center sm:gap-0 sm:divide-y-0">
        {hero.trustStrip.map((item, index) => (
          <Fragment key={item.value}>
            {index > 0 ? (
              <span
                className="mx-5 hidden h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50 sm:block"
                aria-hidden
              />
            ) : null}
            <div className="flex min-w-0 flex-1 items-center gap-3 px-0 py-3.5 sm:justify-center sm:px-4 sm:py-4">
              <p className="shrink-0 font-display text-[17px] font-bold text-gold sm:text-[19px]">
                {item.value}
              </p>
              <p className="text-[12px] leading-snug text-cream/65 sm:text-[13px]">{item.label}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </motion.div>
  )
}

export function Hero() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="hero-section relative flex flex-col overflow-hidden bg-navy" aria-label="Hero">
      <div className="absolute inset-0">
        <motion.img
          src={hero.backgroundImage}
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[68%_center]"
          initial={reduced ? { scale: 1.06, opacity: 1 } : { scale: 1.14, opacity: 0.82 }}
          animate={
            reduced ? { scale: 1.06, opacity: 1 } : { scale: [1.14, 1.06, 1.1, 1.06], opacity: 1 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  scale: {
                    duration: 24,
                    times: [0, 0.06, 0.52, 1],
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                }
          }
        />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(19,32,46,0.96)_0%,rgba(19,32,46,0.9)_30%,rgba(19,32,46,0.55)_52%,rgba(19,32,46,0.2)_72%,rgba(19,32,46,0.05)_88%,transparent_100%)]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="grain-overlay absolute inset-0" />
        <p className="hero-watermark hidden xl:block" aria-hidden>
          GULF COAST
        </p>
      </div>

      <HeroPhotoStack reduced={reduced} />

      <div className="section-container relative z-10 flex flex-1 items-center py-8 sm:py-12 lg:min-h-[calc(85vh-5rem)] lg:max-w-[58%] lg:py-16 lg:pb-40">
        <motion.div
          className="relative w-full pl-0 sm:pl-5"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <div
            className="absolute top-1 -left-0 hidden h-[calc(100%-0.5rem)] w-1 bg-gradient-to-b from-gold via-gold/50 to-transparent sm:-left-1 sm:block"
            aria-hidden
          />

          <motion.div variants={heroEyebrow}>
            <p className="eyebrow mb-2 text-[12px] sm:text-[13px]">{hero.eyebrow}</p>
            <div className="hero-accent-line h-0.5 w-20 bg-gold" aria-hidden />
          </motion.div>

          <motion.h1
            className="mt-5 font-display-expanded text-[30px] leading-[1.04] font-extrabold tracking-tight text-cream min-[400px]:text-[34px] sm:text-[48px] lg:text-[56px] xl:text-[60px]"
            variants={heroTitle}
          >
            {hero.titleLead}
            <span className="mt-1 block text-gold">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-cream/82 sm:text-[17px]"
            variants={heroBody}
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3"
            variants={heroCta}
          >
            <CtaButton
              href={site.phones.texas.href}
              icon={<Phone className="h-4 w-4" aria-hidden />}
              shimmer
              className="w-full !py-3 text-[14px] sm:w-auto sm:!py-3.5 sm:text-[15px]"
            >
              Call {site.phones.texas.number}
            </CtaButton>
            <CtaButton
              href="#contact"
              variant="secondary"
              showArrow
              shimmer={false}
              className="w-full !py-3 text-[14px] sm:w-auto sm:!py-3.5 sm:text-[15px]"
            >
              Get a Free Quote
            </CtaButton>
          </motion.div>

          <motion.div
            className="mt-6 grid w-full max-w-md grid-cols-2 gap-2 sm:mt-7 sm:flex sm:max-w-none sm:flex-wrap"
            variants={staggerFast}
            initial="hidden"
            animate="visible"
          >
            {hero.services.map((service, index) => (
              <motion.span
                key={service}
                variants={heroPill}
                className={`inline-flex items-center justify-center rounded-full border border-cream/15 bg-white/[0.07] px-3 py-1.5 text-center text-[12px] font-medium text-cream/90 sm:justify-start sm:px-3.5 sm:text-[13px] ${reduced ? '' : 'hero-pill'}`}
                style={reduced ? undefined : { animationDelay: `${0.8 + index * 0.5}s` }}
              >
                {service}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <HeroTrustBar reduced={reduced} />
    </section>
  )
}
