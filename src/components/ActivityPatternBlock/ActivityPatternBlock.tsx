import './ActivityPatternBlock.css'
import type { AirportData } from '../../data/airports'

interface Props {
  airport: AirportData
}

const LABEL_HOURS = [0, 3, 6, 9, 12, 15, 18, 21]

export default function ActivityPatternBlock({ airport }: Props) {
  const { activity } = airport
  const hours = activity.hours
  const maxValue = Math.max(...hours.map(h => h.flights))

  const getLocalHour = (): number => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: airport.timezone,
        hour: 'numeric',
        hour12: false,
      })
      const val = parseInt(formatter.format(new Date()))
      return isNaN(val) ? new Date().getHours() : val % 24
    } catch {
      return new Date().getHours()
    }
  }

  const currentHour = getLocalHour()

  const isPeak = (hour: number): boolean => {
    const match = activity.peakHour.match(/(\d+):/)
    if (!match) return false
    const peakH = parseInt(match[1])
    return hour >= peakH && hour < peakH + 2
  }

  const isQuiet = (hour: number): boolean => hour >= 0 && hour <= 5

  const getBarColor = (hour: number): string => {
    if (hour === currentHour) return '#0284C7'
    if (isPeak(hour)) return '#0EA5E9'
    if (isQuiet(hour)) return '#ECEAE6'
    return '#D0CEC9'
  }

  const getBarHeight = (flights: number): number =>
    Math.max(4, Math.round((flights / maxValue) * 100))

  return (
    <div className="apb2-card">
      {/* Top row */}
      <div className="apb2-header">
        <span className="apb2-label">Activity Pattern</span>
        <span className="apb2-summary">{activity.summary}</span>
      </div>

      {/* Chart + labels */}
      <div className="apb2-chart-area">
        {/* Bars only */}
        <div className="apb2-chart">
          <div className="apb2-baseline" />
          {hours.map((h) => (
            <div className="apb2-bar-col" key={h.hour}>
              <div className="apb2-bar-track">
                <div className="apb2-tooltip">
                  <span className="apb2-tooltip-hour">{String(h.hour).padStart(2, '0')}:00</span>
                  <span className="apb2-tooltip-count">~{h.flights} flights</span>
                </div>
                <div
                  className={`apb2-bar${h.hour === currentHour ? ' apb2-bar--current' : ''}`}
                  style={{
                    height: `${getBarHeight(h.flights)}%`,
                    background: getBarColor(h.hour),
                    ...(h.hour === currentHour
                      ? { boxShadow: '0 0 8px rgba(2,132,199,0.35)' }
                      : {}),
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Labels row — separate from bars */}
        <div className="apb2-labels">
          {LABEL_HOURS.map(h => (
            <span key={h} className="apb2-hour-label">
              {String(h).padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="apb2-legend">
        <div className="apb2-legend-item">
          <span className="apb2-legend-dot apb2-legend-dot--peak" />
          <span className="apb2-legend-text">Peak hours&nbsp;&nbsp;{activity.peakHour}</span>
        </div>
        <div className="apb2-legend-item">
          <span className="apb2-legend-dot apb2-legend-dot--quiet" />
          <span className="apb2-legend-text">Quiet period&nbsp;&nbsp;{activity.quietHour}</span>
        </div>
      </div>
    </div>
  )
}
