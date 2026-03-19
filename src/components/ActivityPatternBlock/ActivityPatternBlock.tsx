import './ActivityPatternBlock.css'
import type { AirportData } from '../../data/airports'

interface Props {
  airport: AirportData
}

export default function ActivityPatternBlock({ airport }: Props) {
  const { activity } = airport
  const hours = activity.hours
  const maxValue = Math.max(...hours.map(h => h.flights))

  const getBarHeight = (flights: number) => {
    return Math.max(4, Math.round((flights / maxValue) * 100))
  }

  const isPeak = (hour: number) => {
    const peakStr = activity.peakHour
    const match = peakStr.match(/(\d+):/)
    if (!match) return false
    const peakH = parseInt(match[1])
    return hour >= peakH && hour < peakH + 2
  }

  return (
    <div className="apb2-card">
      <div className="apb2-header">
        <span className="apb2-label">Activity Pattern</span>
        <span className="apb2-summary">{activity.summary}</span>
      </div>

      <div className="apb2-chart">
        {hours.map((h) => (
          <div className="apb2-bar-col" key={h.hour}>
            <div className="apb2-bar-wrap">
              <div
                className={`apb2-bar ${isPeak(h.hour) ? 'apb2-bar--peak' : ''}`}
                style={{ height: `${getBarHeight(h.flights)}%` }}
              />
            </div>
            {h.hour % 3 === 0 && (
              <span className="apb2-hour-label">
                {String(h.hour).padStart(2, '0')}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="apb2-footer">
        <div className="apb2-footer-item">
          <span className="apb2-footer-dot apb2-footer-dot--peak" />
          <span className="apb2-footer-label">Peak hours</span>
          <span className="apb2-footer-value">{activity.peakHour}</span>
        </div>
        <div className="apb2-footer-divider" />
        <div className="apb2-footer-item">
          <span className="apb2-footer-dot apb2-footer-dot--quiet" />
          <span className="apb2-footer-label">Quiet period</span>
          <span className="apb2-footer-value">{activity.quietHour}</span>
        </div>
      </div>
    </div>
  )
}
