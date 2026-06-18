import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

type CtaVariant = 'primary' | 'secondary' | 'emergency'
type CtaSize = 'sm' | 'md'

type CtaButtonProps = {
  href?: string
  children: ReactNode
  variant?: CtaVariant
  size?: CtaSize
  className?: string
  icon?: ReactNode
  showArrow?: boolean
  shimmer?: boolean
  onClick?: () => void
  as?: 'a' | 'button'
  type?: 'button' | 'submit'
  ariaLabel?: string
}

const base =
  'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-md font-semibold tracking-wide uppercase transition-[transform,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const variantStyles: Record<CtaVariant, string> = {
  primary:
    'bg-gold text-navy shadow-[0_4px_16px_rgba(242,180,10,0.2)] hover:shadow-[0_6px_22px_rgba(242,180,10,0.3)] hover:-translate-y-0.5 focus-visible:outline-gold',
  secondary:
    'border border-cream/35 bg-transparent text-cream hover:border-cream hover:bg-white/5 focus-visible:outline-cream',
  emergency:
    'bg-white text-red shadow-md hover:bg-cream hover:-translate-y-0.5 focus-visible:outline-white',
}

const sizeStyles: Record<CtaSize, string> = {
  md: 'px-6 py-3.5 text-[15px]',
  sm: 'px-4 py-2.5 text-[14px]',
}

export function CtaButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  showArrow = false,
  shimmer = variant === 'primary',
  onClick,
  as,
  type = 'button',
  ariaLabel,
}: CtaButtonProps) {
  const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${shimmer ? 'cta-shimmer' : ''} ${className}`
  const content = (
    <>
      {icon ? <span className="relative z-[1]">{icon}</span> : null}
      <span className="relative z-[1] flex items-center gap-2">
        {children}
        {showArrow ? (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        ) : null}
      </span>
    </>
  )

  if (as === 'button' || !href) {
    return (
      <button
        type={type}
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </button>
    )
  }

  return (
    <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </a>
  )
}
