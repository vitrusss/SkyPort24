import type { AirportData } from '../../data/airports'
import './AirportIdentityBlock.css'

interface Props {
  airport: AirportData
}

export default function AirportIdentityBlock({ airport }: Props) {
  return (
    <div className="aib-card">
      <div className="aib-top">
        <div className="aib-name-group">
          <div className="aib-codes">
            <span className="aib-iata">{airport.iata}</span>
            <span className="aib-divider">·</span>
            <span className="aib-icao">{airport.icao}</span>
          </div>
          <h1 className="aib-name">{airport.name}</h1>
          <p className="aib-location">{airport.city}</p>
        </div>

        <div className="aib-meta-grid">
          <div className="aib-meta-item">
            <span className="aib-meta-label">Elevation</span>
            <span className="aib-meta-value">{airport.elevation}</span>
          </div>
          <div className="aib-meta-item">
            <span className="aib-meta-label">Time zone</span>
            <span className="aib-meta-value">{airport.timezone}</span>
          </div>
          <div className="aib-meta-item">
            <span className="aib-meta-label">Est.</span>
            <span className="aib-meta-value">Since {airport.opened}</span>
          </div>
          <div className="aib-meta-item">
            <span className="aib-meta-label">Terminals</span>
            <span className="aib-meta-value">{airport.terminals}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
