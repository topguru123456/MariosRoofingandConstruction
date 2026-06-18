type BookShowcaseProps = {
  src: string
  alt: string
  className?: string
}

export function BookShowcase({ src, alt, className = '' }: BookShowcaseProps) {
  return (
    <div className={`book-showcase group ${className}`.trim()}>
      <div className="book-showcase__shadow" />
      <div className="book-showcase__volume">
        <div className="book-showcase__spine" />
        <div className="book-showcase__cover">
          <img src={src} alt={alt} loading="lazy" />
        </div>
        <div className="book-showcase__edge" />
      </div>
    </div>
  )
}
