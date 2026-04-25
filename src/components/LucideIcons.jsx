function Icon({ children, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function LeafIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M11 20C7.8 20 5 17.2 5 14c0-5 5-9 14-10-1 9-5 14-10 14Z" />
      <path d="M12 12 8 16" />
    </Icon>
  )
}

export function RecycleIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m7.4 7.8 2.1-3.6 3.8 2.2" />
      <path d="m16.6 7.8-2.1-3.6-3.8 2.2" />
      <path d="m3.8 14.3 4.2-.1v4.4" />
      <path d="m20.2 14.3-4.2-.1v4.4" />
      <path d="m6 16.6 2.2 3.8h7.6l2.2-3.8" />
      <path d="M10.9 7.7h2.2l3.8 6.6-1.1 2" />
      <path d="m7.1 16.3-1.1-2 3.8-6.6h2.2" />
    </Icon>
  )
}

export function ScanIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M4 7V5a1 1 0 0 1 1-1h2" />
      <path d="M20 7V5a1 1 0 0 0-1-1h-2" />
      <path d="M4 17v2a1 1 0 0 0 1 1h2" />
      <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
      <path d="M7 12h10" />
      <path d="M9 9h6" />
      <path d="M9 15h6" />
    </Icon>
  )
}

export function BrainIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M8 6a3 3 0 0 1 5-2.2A3 3 0 0 1 18 6a3 3 0 0 1 .5 5.9A3.5 3.5 0 0 1 15 18h-1v2" />
      <path d="M8 6a3 3 0 0 0-2.5 5.9A3.5 3.5 0 0 0 9 18h1v2" />
      <path d="M12 6v12" />
      <path d="M9 10h6" />
      <path d="M9 14h6" />
    </Icon>
  )
}

export function CoinsIcon({ className }) {
  return (
    <Icon className={className}>
      <ellipse cx="12" cy="6" rx="6" ry="3" />
      <path d="M6 6v5c0 1.7 2.7 3 6 3s6-1.3 6-3V6" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </Icon>
  )
}

export function MapIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14" />
      <path d="M15 6v14" />
    </Icon>
  )
}

export function BarChartIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M3 3v18h18" />
      <rect x="7" y="11" width="3" height="7" />
      <rect x="12" y="8" width="3" height="10" />
      <rect x="17" y="5" width="3" height="13" />
    </Icon>
  )
}

export function GlobeIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18" />
      <path d="M12 3a15 15 0 0 0 0 18" />
    </Icon>
  )
}

export function ArrowRightIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  )
}

export function SparklesIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="m12 3 1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4z" />
      <path d="m5 14 .8 2 .2.2 2 .8-2 .8-.2.2-.8 2-.8-2-.2-.2-2-.8 2-.8.2-.2z" />
      <path d="m19 14 .8 2 .2.2 2 .8-2 .8-.2.2-.8 2-.8-2-.2-.2-2-.8 2-.8.2-.2z" />
    </Icon>
  )
}
