import { useState } from 'react'
import './ArrivalsDeparturesBlock.css'
import type { AirportData } from '../../data/airports'
import StatusBadge, { getStatusVariant } from '../StatusBadge/StatusBadge'

interface Props {
  airport: AirportData
}

function AirlineLogo({ code, name }: { code: string; name: string }) {
  const [error, setError] = useState(false)
  if (error) {
    return <div className="adb-airline-fallback">{code.toUpperCase()}</div>
  }
  return (
    <div className="adb-airline-logo-wrap">
      <img
        src={`/Airlines/${code.toLowerCase()}.svg`}
        alt={name}
        className="adb-airline-logo"
        onError={() => setError(true)}
      />
    </div>
  )
}

function FlightNumber({ flight }: { flight: string }) {
  const match = flight.match(/^([A-Z0-9]{2,3})\s*(\d+.*)$/i)
  if (!match) return <span className="adb-flight">{flight}</span>
  return (
    <span className="adb-flight">
      <span className="adb-flight-code">{match[1]}</span>
      {' '}
      <span className="adb-flight-num">{match[2]}</span>
    </span>
  )
}

const DATES = ['Yesterday', 'Today', 'Tomorrow']

export default function ArrivalsDeparturesBlock({ airport }: Props) {
  const [tab, setTab] = useState<'departures' | 'arrivals'>('departures')
  const [dateIndex, setDateIndex] = useState(1)
  const [filter, setFilter] = useState<string>('all')

  const rows = tab === 'departures' ? airport.departures : airport.arrivals
  const filteredRows = filter === 'all'
    ? rows
    : rows.filter(r => r.status.toLowerCase().includes(filter))

  return (
    <div className="adb-card">
      <div className="adb-header">
        <div className="adb-header-left">
          <span className="adb-label">Flight Board</span>
          <div className="adb-tabs">
          <button
            className={`adb-tab ${tab === 'departures' ? 'adb-tab--active' : ''}`}
            onClick={() => setTab('departures')}
          >
            Departures
          </button>
          <button
            className={`adb-tab ${tab === 'arrivals' ? 'adb-tab--active' : ''}`}
            onClick={() => setTab('arrivals')}
          >
            Arrivals
          </button>
          </div>
        </div>
        <div className="adb-date-controls">
          <button
            className="adb-date-btn"
            onClick={() => setDateIndex(Math.max(0, dateIndex - 1))}
            disabled={dateIndex === 0}
          >
            ←
          </button>
          <span className="adb-date-label">{DATES[dateIndex]}</span>
          <button
            className="adb-date-btn"
            onClick={() => setDateIndex(Math.min(2, dateIndex + 1))}
            disabled={dateIndex === 2}
          >
            →
          </button>
          <input
            type="date"
            className="adb-date-input"
            defaultValue={new Date().toISOString().split('T')[0]}
            onChange={(e) => {
              const selected = new Date(e.target.value)
              const today = new Date()
              today.setHours(0,0,0,0)
              selected.setHours(0,0,0,0)
              const diff = Math.round((selected.getTime() - today.getTime()) / 86400000)
              if (diff === -1) setDateIndex(0)
              else if (diff === 0) setDateIndex(1)
              else if (diff === 1) setDateIndex(2)
            }}
          />
        </div>
      </div>

      <div className="adb-filters">
        {['all', 'on time', 'boarding', 'delayed'].map(f => (
          <button
            key={f}
            className={`adb-filter ${filter === f ? 'adb-filter--active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All flights' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="adb-table">
        <div className="adb-table-header">
          <span>Time</span>
          <span>Flight</span>
          <span>{tab === 'departures' ? 'Destination' : 'Origin'}</span>
          <span>Airline</span>
          <span>Status</span>
          <span>Terminal</span>
          <span>Gate</span>
        </div>

        {filteredRows.map((row, i) => (
          <div className="adb-row" key={i}>
            <span className="adb-time">{row.scheduled}</span>
            <FlightNumber flight={row.flight} />
            <span className="adb-place">{tab === 'departures' ? (row as any).to : (row as any).from}</span>
            <span className="adb-airline-cell">
              <AirlineLogo code={(row as any).airlineCode || ''} name={(row as any).airline || ''} />
              <span className="adb-airline-name">{(row as any).airline}</span>
            </span>
            <span className="adb-status-cell">
              <StatusBadge label={row.status} variant={getStatusVariant(row.status)} />
            </span>
            <span className="adb-terminal">{(row as any).terminal || '—'}</span>
            <span className="adb-gate">{(row as any).gate || '—'}</span>
          </div>
        ))}
      </div>

      <div className="adb-footer">
        <span className="adb-count">
          Showing {filteredRows.length} of {airport.throughput.flightsPerDay.toLocaleString()} flights
        </span>
      </div>
    </div>
  )
}
