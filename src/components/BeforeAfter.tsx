import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { transformations } from '../content/siteContent'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function BeforeAfter() {
  return (
    <section id="transformations" className="bg-cream py-20 sm:py-24">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            eyebrow="Real Results"
            title="Before & After"
            description="See the difference quality craftsmanship makes — from rough-in to finished spaces."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {transformations.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <article className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_rgba(19,32,46,0.08)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ReactCompareSlider
                    itemOne={
                      <ReactCompareSliderImage
                        src={item.before.src}
                        alt={item.before.alt}
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src={item.after.src}
                        alt={item.after.alt}
                        style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                      />
                    }
                    className="h-full w-full"
                  />
                  <span className="pointer-events-none absolute top-4 left-4 rounded-md bg-navy/80 px-3 py-1 text-[12px] font-semibold tracking-wide text-cream uppercase">
                    {item.before.label}
                  </span>
                  <span className="pointer-events-none absolute top-4 right-4 rounded-md bg-gold px-3 py-1 text-[12px] font-semibold tracking-wide text-navy uppercase">
                    {item.after.label}
                  </span>
                </div>
                <div className="border-t border-navy/5 px-5 py-4">
                  <h3 className="font-display text-[18px] font-bold text-navy">{item.title}</h3>
                  <p className="mt-1 text-[14px] text-slate-soft">{item.location}</p>
                  <p className="mt-2 text-[13px] text-slate-soft/80">
                    Drag the slider to compare
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
