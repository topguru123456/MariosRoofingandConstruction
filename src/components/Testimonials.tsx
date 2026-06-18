import { MessageSquareQuote } from 'lucide-react'
import { testimonials } from '../content/siteContent'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

function TestimonialCard({
  quote,
  author,
  location,
}: {
  quote: string
  author: string
  location: string
}) {
  return (
    <blockquote className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-10 sm:px-10 sm:py-12">
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" aria-hidden />

      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
        <MessageSquareQuote className="h-6 w-6" aria-hidden />
      </div>

      <p className="text-center text-[18px] leading-relaxed font-medium text-cream/92 sm:text-[20px] sm:leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>

      <footer className="mt-8 border-t border-white/10 pt-6 text-center">
        <cite className="font-display text-[18px] font-bold text-gold not-italic">{author}</cite>
        <p className="mt-1 text-[14px] text-cream/55">{location}</p>
      </footer>
    </blockquote>
  )
}

export function Testimonials() {
  if (!testimonials.enabled || testimonials.items.length === 0) {
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

  return (
    <section id="testimonials" className="bg-navy py-20 sm:py-24">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
            light
            className="mx-auto max-w-2xl text-center"
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          {testimonials.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <TestimonialCard quote={item.quote} author={item.author} location={item.location} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
