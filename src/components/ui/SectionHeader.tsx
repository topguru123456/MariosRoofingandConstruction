import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: ReactNode
  light?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  light = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className={light ? 'eyebrow' : 'eyebrow-light'}>{eyebrow}</p>
      <h2 className={light ? 'section-title-light' : 'section-title'}>{title}</h2>
      {description ? (
        <p
          className={`mt-4 text-[17px] leading-relaxed ${
            light ? 'text-cream/80' : 'text-slate-soft'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
