type GulfCoastMapProps = {
  className?: string
}

export function GulfCoastMap({ className = '' }: GulfCoastMapProps) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M40 280 C80 240 120 200 160 190 C200 180 240 160 280 140 C320 120 360 80 380 40"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 4"
        opacity="0.35"
      />
      <path
        d="M60 260 L120 220 L180 200 L240 170 L300 130 L360 90"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="120" cy="218" r="6" fill="currentColor" opacity="0.9" />
      <circle cx="120" cy="218" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <circle cx="200" cy="175" r="5" fill="currentColor" opacity="0.75" />
      <circle cx="280" cy="135" r="5" fill="currentColor" opacity="0.75" />
      <circle cx="340" cy="100" r="4" fill="currentColor" opacity="0.6" />
      <text x="128" y="212" fill="currentColor" fontSize="11" fontWeight="600" opacity="0.8">
        Houston
      </text>
      <text x="208" y="168" fill="currentColor" fontSize="10" fontWeight="600" opacity="0.7">
        Galveston
      </text>
      <text x="288" y="128" fill="currentColor" fontSize="10" fontWeight="600" opacity="0.6">
        Gulf Coast
      </text>
    </svg>
  )
}
