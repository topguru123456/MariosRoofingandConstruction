import { motion } from 'framer-motion'
import { Fragment, useState } from 'react'
import { CirclePlay } from 'lucide-react'
import { hero } from '../content/siteContent'
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
import { HeroVideoModal } from './HeroVideoModal'
import { CtaButton } from './ui/CtaButton'

function HeroPhotoStack({ reduced }: { reduced: boolean }) {
  const [primary, secondary] = hero.showcasePhotos

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,22rem)] lg:max-w-none">
      <div className="relative aspect-[5/4] w-full sm:aspect-[6/5] xl:aspect-[5/4.2]">
        <motion.a
          href="#gallery"
          className="hero-photo-float pointer-events-auto absolute top-0 right-0 z-10 block w-[66%] overflow-hidden rounded-xl border border-white/20 bg-navy shadow-[0_28px_60px_rgba(0,0,0,0.45)] sm:w-[68%] xl:w-[72%]"
          variants={heroPhotoPrimary}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gold" aria-hidden />
          <img src={primary.src} alt={primary.alt} className="aspect-[4/3] w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent px-3 py-2.5 xl:px-4 xl:py-3">
            <p className="text-[10px] font-bold tracking-[0.12em] text-gold uppercase xl:text-[11px]">
              {primary.caption}
            </p>
          </div>
        </motion.a>

        <motion.a
          href="#meet-mario"
          className="hero-photo-float hero-photo-float-delayed pointer-events-auto absolute bottom-0 left-0 z-20 block w-[50%] overflow-hidden rounded-xl border-4 border-navy shadow-[0_20px_50px_rgba(0,0,0,0.4)] sm:w-[52%] xl:w-[58%]"
          variants={heroPhotoSecondary}
          initial={reduced ? false : 'hidden'}
          animate="visible"
        >
          <img
            src={secondary.src}
            alt={secondary.alt}
            className="aspect-[4/5] w-full object-cover scale-110"
            style={{ objectPosition: secondary.objectPosition ?? 'center' }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-navy/85 px-2.5 py-1.5 xl:px-3 xl:py-2">
            <p className="text-[9px] font-bold tracking-[0.1em] text-cream/80 uppercase xl:text-[10px]">
              {secondary.caption}
            </p>
          </div>
        </motion.a>
      </div>
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
  const [videoOpen, setVideoOpen] = useState(false)

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
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(19,32,46,0.96)_0%,rgba(19,32,46,0.9)_30%,rgba(19,32,46,0.55)_52%,rgba(19,32,46,0.2)_72%,rgba(19,32,46,0.05)_88%,transparent_100%)] lg:bg-[linear-gradient(100deg,rgba(19,32,46,0.96)_0%,rgba(19,32,46,0.88)_38%,rgba(19,32,46,0.62)_58%,rgba(19,32,46,0.28)_78%,rgba(19,32,46,0.08)_92%,transparent_100%)]"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="grain-overlay absolute inset-0" />
        <p className="hero-watermark hidden xl:block" aria-hidden>
          GULF COAST
        </p>
      </div>

      <div className="section-container relative z-10 flex flex-1 flex-col py-8 sm:py-12 lg:grid lg:min-h-[calc(85vh-5rem)] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-12 lg:pb-36 xl:gap-10 xl:py-16 xl:pb-40">
        <motion.div
          className="relative w-full min-w-0 pl-0 sm:pl-5 lg:col-span-6 lg:pr-2 xl:col-span-7 xl:pr-4"
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
            className="mt-5 font-display-expanded text-[30px] leading-[1.04] font-extrabold tracking-tight text-cream min-[400px]:text-[34px] sm:text-[48px] lg:text-[42px] lg:leading-[1.06] xl:text-[56px] 2xl:text-[60px]"
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
              as="button"
              type="button"
              onClick={() => setVideoOpen(true)}
              icon={<CirclePlay className="h-5 w-5" aria-hidden />}
              shimmer
              className="focus-ring-white w-full !py-3.5 text-[14px] shadow-[0_0_0_1px_rgba(242,180,10,0.35),0_10px_36px_rgba(242,180,10,0.28)] sm:w-auto sm:!py-4 sm:text-[15px]"
            >
              {hero.projectVideo.ctaLabel}
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

        <div className="relative hidden min-w-0 lg:col-span-6 lg:block xl:col-span-5">
          <HeroPhotoStack reduced={reduced} />
        </div>
      </div>

      <HeroTrustBar reduced={reduced} />

      <HeroVideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        video={hero.projectVideo}
      />
    </section>
  )
}
