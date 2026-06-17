import { useEffect, useState } from 'react'

/** Shrink logo once the top bar has scrolled away. */
const SCROLL_THRESHOLD = 56

export function useScrollHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scrolled
}
