import { Loader2, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { hero } from '../content/siteContent'

type ProjectVideo = (typeof hero)['projectVideo']

type LoadState = 'loading' | 'ready' | 'error'

type HeroVideoModalProps = {
  open: boolean
  onClose: () => void
  video: ProjectVideo
}

export function HeroVideoModal({ open, onClose, video }: HeroVideoModalProps) {
  const titleId = useId()
  const videoRef = useRef<HTMLVideoElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [buffered, setBuffered] = useState(0)

  const reset = useCallback(() => {
    const el = videoRef.current
    if (el) {
      el.pause()
      el.removeAttribute('src')
      el.load()
    }
    setLoadState('loading')
    setBuffered(0)
  }, [])

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [onClose, reset])

  useEffect(() => {
    if (!open) return

    setLoadState('loading')
    setBuffered(0)
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, handleClose])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="presentation"
      onClick={handleClose}
    >
      <div className="absolute inset-0 bg-navy/92 backdrop-blur-md" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex w-full max-w-[min(96vw,22rem)] flex-col sm:max-w-[min(80vw,26rem)] md:max-w-[min(56vw,30rem)] lg:max-w-[min(44vw,32rem)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-4 px-1">
          <div className="min-w-0">
            <p id={titleId} className="font-display text-[18px] font-bold text-cream sm:text-[22px]">
              {video.title}
            </p>
            <p className="mt-1 text-[13px] text-cream/65 sm:text-[14px]">{video.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            className="focus-ring-dark inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-cream transition-colors hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.6)]">
          <div className="relative flex min-h-[min(72vh,640px)] items-center justify-center sm:min-h-[min(78vh,760px)]">
            {loadState !== 'ready' ? (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                {video.poster ? (
                  <img
                    src={video.poster}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                    aria-hidden
                  />
                ) : null}
                <div className="relative">
                  {loadState === 'error' ? (
                    <>
                      <p className="font-display text-[17px] font-bold text-cream">
                        Video couldn&apos;t load
                      </p>
                      <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-cream/70">
                        {video.fallbackMessage}
                      </p>
                    </>
                  ) : (
                    <>
                      <Loader2
                        className="mx-auto h-10 w-10 animate-spin text-gold"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <p className="mt-4 font-display text-[17px] font-bold text-cream">
                        Loading project video…
                      </p>
                      <p className="mt-2 text-[13px] text-cream/65">
                        First play may take a few seconds
                      </p>
                      {buffered > 0 ? (
                        <div className="mx-auto mt-5 w-full max-w-[240px]">
                          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gold transition-[width] duration-300"
                              style={{ width: `${buffered}%` }}
                            />
                          </div>
                          <p className="mt-2 text-[11px] font-medium tracking-wide text-cream/50 uppercase">
                            Buffered {buffered}%
                          </p>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            ) : null}

            <video
              ref={videoRef}
              className="hero-project-video mx-auto block h-auto max-h-[min(78vh,820px)] w-full object-contain"
              src={video.src}
              controls
              playsInline
              preload="auto"
              poster={video.poster}
              onLoadedData={() => setLoadState('ready')}
              onCanPlay={() => setLoadState('ready')}
              onError={() => setLoadState('error')}
              onProgress={() => {
                const el = videoRef.current
                if (!el || !el.duration || !Number.isFinite(el.duration)) return
                if (!el.buffered.length) return
                const end = el.buffered.end(el.buffered.length - 1)
                setBuffered(Math.min(100, Math.round((end / el.duration) * 100)))
              }}
            >
              Your browser does not support embedded video.
            </video>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
