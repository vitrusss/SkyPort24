import { useParams } from 'react-router-dom'
import { getAirport } from '../data/airports'
import Header from '../components/Header/Header'
import AirportIdentityBlock from '../components/AirportIdentityBlock/AirportIdentityBlock'
import LocalTimeBlock from '../components/LocalTimeBlock/LocalTimeBlock'
import WeatherBlock from '../components/WeatherBlock/WeatherBlock'
import AirportPulseBlock from '../components/AirportPulseBlock/AirportPulseBlock'
import ArrivalsDeparturesBlock from '../components/ArrivalsDeparturesBlock/ArrivalsDeparturesBlock'
import ActivityPatternBlock from '../components/ActivityPatternBlock/ActivityPatternBlock'
import './AirportPage.css'

export default function AirportPage() {
  const { iata } = useParams<{ iata: string }>()
  const airport = getAirport(iata ?? '')

  return (
    <div className="ap-root">
      <main className="ap-main">
        <div className="ap-container">
          <Header />
          <div className="ap-gap-header" />
          {!airport ? (
            <p className="ap-not-found">Airport "{iata?.toUpperCase()}" not found.</p>
          ) : (
            <div className="ap-blocks">
              <AirportIdentityBlock airport={airport} />
              <div className="ap-row-3col">
                <LocalTimeBlock airport={airport} />
                <WeatherBlock airport={airport} />
                <AirportPulseBlock airport={airport} />
              </div>
              <ArrivalsDeparturesBlock airport={airport} />
              <ActivityPatternBlock airport={airport} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
