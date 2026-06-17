import { MessageSquareQuote } from 'lucide-react'
import { testimonials } from '../content/siteContent'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Testimonials() {
  if (testimonials.enabled && testimonials.items.length > 0) {
    return (
      <section id="testimonials" className="bg-navy py-20 sm:py-24">
        <div className="section-container">
          <Reveal>
            <SectionHeader
              eyebrow={testimonials.eyebrow}
              title={testimonials.title}
              light
              className="mx-auto text-center"
            />
          </Reveal>
          {/* Carousel can be enabled when real reviews are added */}
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="bg-navy py-20 sm:py-24">
      <div className="section-container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeader
              eyebrow={testimonials.eyebrow}
              title={testimonials.title}
              light
              className="mx-auto text-center [&_.eyebrow]:text-center [&_h2]:text-center"
            />

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 px-6 py-12 sm:px-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
                <MessageSquareQuote className="h-7 w-7" aria-hidden />
              </div>
              <p className="text-[18px] leading-relaxed font-medium text-cream/85 sm:text-[20px]">
                {testimonials.placeholderMessage}
              </p>
              <p className="mt-4 text-[14px] text-cream/50">
                Customer reviews will appear here once collected.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
