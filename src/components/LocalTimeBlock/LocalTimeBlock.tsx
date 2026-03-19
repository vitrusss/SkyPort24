import { useState, useEffect } from 'react'
import './LocalTimeBlock.css'
import type { AirportData } from '../../data/airports'

interface Props {
  airport: AirportData
}

const IANA_MAP: Record<string, string> = {
  LHR: 'Europe/London',
  JFK: 'America/New_York',
  AMS: 'Europe/Amsterdam',
  HND: 'Asia/Tokyo',
  DXB: 'Asia/Dubai',
}

export default function LocalTimeBlock({ airport }: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const ianaZone = IANA_MAP[airport.iata] ?? 'UTC'

  const timeStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: ianaZone,
    hour: '2-digit',
    minute: '2-digit',
  }).format(now)

  const dateStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: ianaZone,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(now)

  const tzAbbrStr = new Intl.DateTimeFormat('en', {
    timeZone: ianaZone,
    timeZoneName: 'short',
  }).formatToParts(now).find(p => p.type === 'timeZoneName')?.value ?? ''

  return (
    <div className="ltb-card">
      <div className="ltb-label">Local Time</div>

      <div className="ltb-hero">
        <div className="ltb-time-display">
          <span className="ltb-time">{timeStr}</span>
          <span className="ltb-ampm">{tzAbbrStr}</span>
        </div>
        <span className="ltb-date">{dateStr}</span>
      </div>

      <div className="ltb-divider" />

      <div className="ltb-stats">
        <div className="ltb-stat-row">
          <span className="ltb-stat-label">Sunrise</span>
          <span className="ltb-stat-value">{airport.sunTimes.sunrise}</span>
        </div>
        <div className="ltb-stat-row">
          <span className="ltb-stat-label">Sunset</span>
          <span className="ltb-stat-value">{airport.sunTimes.sunset}</span>
        </div>
        <div className="ltb-stat-row">
          <span className="ltb-stat-label">UTC offset</span>
          <span className="ltb-stat-value">{tzAbbrStr}</span>
        </div>
      </div>
    </div>
  )
}
