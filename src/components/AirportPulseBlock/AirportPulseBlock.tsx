import './AirportPulseBlock.css'
import type { AirportData } from '../../data/airports'

interface Props {
  airport: AirportData
}

function getStatus(onTime: number, avgDelay: number) {
  if (onTime >= 80 && avgDelay <= 15) return { key: 'good', label: 'On schedule', color: '#3DAA72' }
  if (onTime >= 70 && avgDelay <= 25) return { key: 'moderate', label: 'Delays today', color: '#C48A30' }
  return { key: 'poor', label: 'Disrupted', color: '#C44040' }
}

export default function AirportPulseBlock({ airport }: Props) {
  const { delays, activity, throughput } = airport
  const status = getStatus(delays.onTime, delays.avgDelayMin)

  return (
    <div className="apb-card">

      <div className="apb-header">
        <span className="apb-label">Airport Status</span>
      </div>

      <div className="apb-body">

        <div className="apb-level1">
          <div className="apb-kpi-row">
            <span className="apb-kpi-num">{delays.onTime}%</span>
            <span className="apb-kpi-desc">on-time performance</span>
          </div>
          <div className="apb-kpi-row">
            <span className="apb-kpi-num">{delays.avgDelayMin} min</span>
            <span className="apb-kpi-desc">average delay</span>
          </div>
        </div>

        <div className="apb-level2">
          <span
            className="apb-status-dot"
            style={{ background: status.color }}
          />
          <span className="apb-status-label">{status.label}</span>
          <span className="apb-status-context">
            {delays.onTime >= 80
              ? 'Above average performance'
              : delays.onTime >= 70
              ? 'Below average performance'
              : 'Significantly below average'}
          </span>
        </div>

      </div>

      <div className="apb-divider" />

      <div className="apb-level3">
        <div className="apb-meta-row">
          <span className="apb-meta-label">Peak hours</span>
          <span className="apb-meta-value">{activity.peakHour}</span>
        </div>
        <div className="apb-meta-row">
          <span className="apb-meta-label">Flights today</span>
          <span className="apb-meta-value">{throughput.flightsPerDay.toLocaleString()}</span>
        </div>
        <div className="apb-meta-row">
          <span className="apb-meta-label">Annual passengers</span>
          <span className="apb-meta-value">{throughput.annualPassengers}</span>
        </div>
      </div>

    </div>
  )
}
