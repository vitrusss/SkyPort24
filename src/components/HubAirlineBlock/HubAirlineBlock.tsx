import { useState } from 'react'
import './HubAirlineBlock.css'

export interface HubAirline {
  iata: string
  name: string
  role: 'Hub' | 'Base' | 'Partner'
}

interface Props {
  airlines: HubAirline[]
  editorial: string
}

function AirlineLogo({ iata, name }: { iata: string; name: string }) {
  const [error, setError] = useState(false)
  if (error) {
    return <div className="hab-logo-fallback">{iata.toUpperCase()}</div>
  }
  return (
    <div className="hab-logo-wrap">
      <img
        src={`/Airlines/${iata.toLowerCase()}.svg`}
        alt={name}
        className="hab-logo"
        onError={() => setError(true)}
      />
    </div>
  )
}

export default function HubAirlineBlock({ airlines, editorial }: Props) {
  return (
    <div className="hab-card">
      <span className="hab-label">Hub Airlines</span>
      <div className="hab-list">
        {airlines.map((airline) => (
          <div className="hab-row" key={airline.iata}>
            <AirlineLogo iata={airline.iata} name={airline.name} />
            <span className="hab-name">{airline.name}</span>
            <span className={`hab-badge hab-badge--${airline.role.toLowerCase()}`}>
              {airline.role}
            </span>
          </div>
        ))}
      </div>
      <p className="hab-editorial">{editorial}</p>
    </div>
  )
}
