import { Camera, Expand } from 'lucide-react'
import { useMemo, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import { gallery, type GalleryItem } from '../content/siteContent'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

function GalleryTile({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem
  index: number
  onOpen: (index: number) => void
}) {
  if (item.type === 'placeholder') {
    return (
      <Reveal delay={index * 0.05}>
        <div className="group relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-navy/15 bg-cream p-6 text-center">
          <div className="mb-3 rounded-full bg-navy/5 p-4 text-navy/50">
            <Camera className="h-8 w-8" strokeWidth={1.5} aria-hidden />
          </div>
          <p className="font-display text-[18px] font-bold text-navy">{item.caption}</p>
          <p className="mt-2 max-w-[220px] text-[14px] leading-relaxed text-slate-soft">
            {item.message}
          </p>
          <span className="mt-4 rounded-full bg-gold/15 px-3 py-1 text-[12px] font-semibold tracking-wide text-gold-deep uppercase">
            Coming Soon
          </span>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal delay={index * 0.05}>
      <button
        type="button"
        className="focus-ring-dark group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-navy text-left shadow-md"
        onClick={() => onOpen(index)}
        aria-label={`View ${item.caption}`}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <p className="text-[14px] font-semibold text-cream sm:text-[15px]">{item.caption}</p>
          <span className="rounded-full bg-gold/90 p-2 text-navy opacity-0 transition-opacity group-hover:opacity-100">
            <Expand className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </button>
    </Reveal>
  )
}

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  const imageSlides = useMemo(
    () =>
      gallery
        .filter((item): item is Extract<GalleryItem, { type: 'image' }> => item.type === 'image')
        .map((item) => ({ src: item.src, alt: item.alt, title: item.caption })),
    [],
  )

  const imageIndexMap = useMemo(() => {
    let imageCounter = -1
    return gallery.map((item) => {
      if (item.type === 'image') {
        imageCounter += 1
        return imageCounter
      }
      return -1
    })
  }, [])

  const openAtGalleryIndex = (galleryIndex: number) => {
    const imageIndex = imageIndexMap[galleryIndex]
    if (imageIndex >= 0) setLightboxIndex(imageIndex)
  }

  return (
    <section id="gallery" className="bg-white py-20 sm:py-24">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            eyebrow="Portfolio"
            title="Our Work"
            description="Real projects across roofing, remodeling, and construction — quality you can see."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, index) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={index}
              onOpen={() => openAtGalleryIndex(index)}
            />
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={imageSlides}
      />
    </section>
  )
}
