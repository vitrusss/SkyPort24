import { useParams } from 'react-router-dom'
import { getAirport } from '../data/airports'
import Header from '../components/Header/Header'
import AirportIdentityBlock from '../components/AirportIdentityBlock/AirportIdentityBlock'
import LocalTimeBlock from '../components/LocalTimeBlock/LocalTimeBlock'
import WeatherBlock from '../components/WeatherBlock/WeatherBlock'
import AirportPulseBlock from '../components/AirportPulseBlock/AirportPulseBlock'
import ArrivalsDeparturesBlock from '../components/ArrivalsDeparturesBlock/ArrivalsDeparturesBlock'
import ActivityPatternBlock from '../components/ActivityPatternBlock/ActivityPatternBlock'
import HubAirlineBlock from '../components/HubAirlineBlock/HubAirlineBlock'
import './AirportPage.css'

const JFK_HUB_AIRLINES = [
  { iata: 'AA', name: 'American Airlines', role: 'Hub'     as const },
  { iata: 'DL', name: 'Delta Air Lines',   role: 'Hub'     as const },
  { iata: 'B6', name: 'JetBlue Airways',   role: 'Base'    as const },
  { iata: 'UA', name: 'United Airlines',   role: 'Partner' as const },
]

const JFK_EDITORIAL = 'JFK is a major hub for American Airlines and Delta, with JetBlue operating a large base for domestic and Caribbean routes and strong transatlantic connections across all carriers.'

export default function AirportPage() {
  const { iata } = useParams<{ iata: string }>()
  const airport = getAirport(iata ?? '')

  if (!airport) {
    return (
      <div className="ap-root">
        <main className="ap-main">
          <div className="ap-container">
            <Header />
            <div className="ap-gap-header" />
            <div className="ap-not-found">
              <p className="ap-not-found-title">Airport data coming soon</p>
              <p className="ap-not-found-sub">We're working on adding full details for this airport.</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="ap-root">
      <main className="ap-main">
        <div className="ap-container">
          <Header />
          <div className="ap-gap-header" />
          <div className="ap-blocks">
            <AirportIdentityBlock airport={airport} />
            <div className="ap-row-3col">
              <LocalTimeBlock airport={airport} />
              <WeatherBlock airport={airport} />
              <AirportPulseBlock airport={airport} />
            </div>
            <ArrivalsDeparturesBlock airport={airport} />
            <ActivityPatternBlock airport={airport} />
            <HubAirlineBlock airlines={JFK_HUB_AIRLINES} editorial={JFK_EDITORIAL} />
          </div>
        </div>
      </main>
    </div>
  )
}
