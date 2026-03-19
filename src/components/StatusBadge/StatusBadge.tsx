import './StatusBadge.css'

type BadgeVariant = 'green' | 'amber' | 'red' | 'orange' | 'blue' | 'gray' | 'dark'

interface Props {
  label: string
  variant: BadgeVariant
  dot?: boolean
}

export function getStatusVariant(status: string): BadgeVariant {
  const s = status.toLowerCase()
  if (s.includes('on time') || s.includes('landed') || s.includes('on-time')) return 'green'
  if (s.includes('boarding')) return 'blue'
  if (s.includes('delay')) return 'amber'
  if (s.includes('cancel')) return 'red'
  if (s.includes('divert')) return 'orange'
  if (s.includes('scheduled')) return 'gray'
  return 'gray'
}

export default function StatusBadge({ label, variant, dot = true }: Props) {
  return (
    <span className={`status-badge status-badge--${variant}`}>
      {dot && <span className="status-badge__dot" />}
      {label}
    </span>
  )
}
