type IconProps = { className?: string }

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function ArrowUpRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  )
}

export function ArrowRight({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function ArrowLeft({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className}>
      <path d="M20 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  )
}

export function Github({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.38 9.38 0 0 1 2.5-.34c.85 0 1.7.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  )
}

export function Mail({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function Menu({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </svg>
  )
}

export function Close({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...base} strokeWidth={1.8} className={className}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function Play({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.5 6.2a1 1 0 0 1 1.52-.85l7.4 4.8a1.1 1.1 0 0 1 0 1.86l-7.4 4.8a1 1 0 0 1-1.52-.86V6.2Z" />
    </svg>
  )
}

export function Sparkle({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5c.42 3.9 2.1 5.58 6 6-3.9.42-5.58 2.1-6 6-.42-3.9-2.1-5.58-6-6 3.9-.42 5.58-2.1 6-6Z" />
      <path d="M18.6 14.2c.2 1.85 1 2.65 2.85 2.85-1.85.2-2.65 1-2.85 2.85-.2-1.85-1-2.65-2.85-2.85 1.85-.2 2.65-1 2.85-2.85Z" />
    </svg>
  )
}
