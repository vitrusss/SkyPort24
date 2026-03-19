import './WeatherBlock.css'
import type { AirportData } from '../../data/airports'
import { HugeiconsIcon } from '@hugeicons/react'
import { Sun01Icon, CloudIcon, CloudAngledRainIcon, CloudSnowIcon } from '@hugeicons/core-free-icons'

interface Props {
  airport: AirportData
}

function getIconData(icon: string) {
  if (icon === 'sun') return { icon: Sun01Icon, color: '#F59E0B' }
  if (icon === 'snow') return { icon: CloudSnowIcon, color: '#60A5FA' }
  if (icon === 'rain') return { icon: CloudAngledRainIcon, color: '#3B82F6' }
  return { icon: CloudIcon, color: '#94A3B8' }
}

function conditionKey(condition: string): string {
  const c = condition.toLowerCase()
  if (c.includes('sun') || c.includes('clear')) return 'sun'
  if (c.includes('snow')) return 'snow'
  if (c.includes('rain')) return 'rain'
  return 'cloud'
}

export default function WeatherBlock({ airport }: Props) {
  const w = airport.weather
  const mainIconData = getIconData(conditionKey(w.condition))

  return (
    <div className="wb-card">
      <div className="wb-label">Current Weather</div>

      <div className="wb-hero">
        <div className="wb-main">
          <HugeiconsIcon icon={mainIconData.icon} size={40} color={mainIconData.color} />
          <span className="wb-temp">{w.temp}°C</span>
          <div className="wb-temp-block">
            <span className="wb-condition">{w.condition}</span>
            <span className="wb-feels">Feels like {w.feelsLike}°C</span>
          </div>
        </div>

        <div className="wb-forecast">
          {w.forecast.map((f, i) => {
            const fIcon = getIconData(f.icon)
            return (
              <div className="wb-forecast-day" key={i}>
                <span className="wb-forecast-label">{f.day}</span>
                <HugeiconsIcon icon={fIcon.icon} size={16} color={fIcon.color} />
                <span className="wb-forecast-high">{f.high}°</span>
                <span className="wb-forecast-low">{f.low}°</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="wb-divider" />

      <div className="wb-stats">
        <div className="wb-stat-row">
          <span className="wb-stat-label">Wind</span>
          <span className="wb-stat-value">{w.wind}</span>
        </div>
        <div className="wb-stat-row">
          <span className="wb-stat-label">Visibility</span>
          <span className="wb-stat-value">{w.visibility}</span>
        </div>
        <div className="wb-stat-row">
          <span className="wb-stat-label">Humidity</span>
          <span className="wb-stat-value">{w.humidity}</span>
        </div>
      </div>
    </div>
  )
}
