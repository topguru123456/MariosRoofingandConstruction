import { motion } from 'framer-motion'
import { AlertCircle, Phone } from 'lucide-react'
import { site } from '../content/siteContent'
import { fadeUp, staggerContainer } from '../lib/motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { CtaButton } from './ui/CtaButton'
import { Reveal } from './ui/Reveal'

export function EmergencyBanner() {
  const reduced = usePrefersReducedMotion()

  return (
    <Reveal direction="scale">
      <section
        aria-label="Emergency service"
        className="pitch-roofline-enter emergency-banner relative py-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-white blur-2xl" />
          <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white blur-3xl" />
        </div>

        <div className="section-container relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <motion.div
            className="flex items-start gap-4"
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? false : 'hidden'}
            whileInView={reduced ? undefined : 'visible'}
            viewport={{ once: true, margin: '-40px' }}
          >
            <motion.div
              variants={reduced ? undefined : fadeUp}
              className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-2 ring-white/25 ${reduced ? '' : 'emergency-icon-pulse'}`}
            >
              <AlertCircle className="h-6 w-6 text-white" aria-hidden />
            </motion.div>
            <motion.div variants={reduced ? undefined : fadeUp}>
              <p className="font-display text-[20px] font-bold sm:text-[26px]">
                <span className={reduced ? 'text-white' : 'emergency-headline'}>
                  24-Hour Emergency Service Available
                </span>
              </p>
              <p className="mt-1.5 text-[15px] text-white/90">
                Storm damage, leaks, and urgent repairs — call now.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <CtaButton
              href={site.phones.texas.href}
              variant="emergency"
              icon={<Phone className="h-4 w-4" aria-hidden />}
              shimmer={false}
            >
              {site.phones.texas.number}
            </CtaButton>
          </motion.div>
        </div>
      </section>
    </Reveal>
  )
}
