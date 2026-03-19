import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroSearch.css'
import airportIllustration from '../../assets/airport-illustration.png'

// ─── Assets ─────────────────────────────────────────────────────────────────
const SEARCH_ICON   = 'https://www.figma.com/api/mcp/asset/bba81635-dd30-4d38-bf66-30f43ef08be3'
const CANCEL_ICON   = 'https://www.figma.com/api/mcp/asset/9ea47f16-be52-4b32-ad00-37a75a6d3a8f'
const LOCATION_ICON = 'https://www.figma.com/api/mcp/asset/264faf33-ddee-48c4-90b4-db28bf68e6d0'
const AIRPORT_ICON  = 'https://www.figma.com/api/mcp/asset/ca4229dd-aa4a-4f9b-a59e-6f5b8707ee3a'

// ─── Data ────────────────────────────────────────────────────────────────────
interface Airport {
  name: string
  code: string
}

interface CityResult {
  city: string
  state: string
  code: string
  airports: Airport[]
}

const AIRPORTS_DATA: CityResult[] = [
  { city: 'London', state: 'England', code: 'LON', airports: [
    { name: 'Heathrow Airport', code: 'LHR' },
    { name: 'Gatwick Airport', code: 'LGW' },
    { name: 'Stansted Airport', code: 'STN' },
    { name: 'Luton Airport', code: 'LTN' },
    { name: 'City Airport', code: 'LCY' },
  ]},
  { city: 'New York', state: 'New York', code: 'NYC', airports: [
    { name: 'John F Kennedy Intl Airport', code: 'JFK' },
    { name: 'La Guardia Airport', code: 'LGA' },
    { name: 'Newark Liberty Intl Airport', code: 'EWR' },
    { name: 'Stewart Intl Airport', code: 'SWF' },
  ]},
  { city: 'Dubai', state: 'United Arab Emirates', code: 'DXB', airports: [
    { name: 'Dubai International Airport', code: 'DXB' },
    { name: 'Al Maktoum International Airport', code: 'DWC' },
  ]},
  { city: 'Tokyo', state: 'Japan', code: 'TYO', airports: [
    { name: 'Haneda Airport', code: 'HND' },
    { name: 'Narita International Airport', code: 'NRT' },
  ]},
  { city: 'Paris', state: 'France', code: 'PAR', airports: [
    { name: 'Charles de Gaulle Airport', code: 'CDG' },
    { name: 'Orly Airport', code: 'ORY' },
    { name: 'Beauvais-Tillé Airport', code: 'BVA' },
  ]},
  { city: 'Singapore', state: 'Singapore', code: 'SIN', airports: [
    { name: 'Changi Airport', code: 'SIN' },
  ]},
  { city: 'Amsterdam', state: 'Netherlands', code: 'AMS', airports: [
    { name: 'Amsterdam Airport Schiphol', code: 'AMS' },
  ]},
  { city: 'Frankfurt', state: 'Germany', code: 'FRA', airports: [
    { name: 'Frankfurt Airport', code: 'FRA' },
    { name: 'Frankfurt Hahn Airport', code: 'HHN' },
  ]},
  { city: 'Istanbul', state: 'Turkey', code: 'IST', airports: [
    { name: 'Istanbul Airport', code: 'IST' },
    { name: 'Sabiha Gökçen Airport', code: 'SAW' },
  ]},
  { city: 'Los Angeles', state: 'California', code: 'LAX', airports: [
    { name: 'Los Angeles International Airport', code: 'LAX' },
    { name: 'Hollywood Burbank Airport', code: 'BUR' },
    { name: 'Long Beach Airport', code: 'LGB' },
    { name: 'Ontario International Airport', code: 'ONT' },
  ]},
  { city: 'Chicago', state: 'Illinois', code: 'CHI', airports: [
    { name: "O'Hare International Airport", code: 'ORD' },
    { name: 'Midway International Airport', code: 'MDW' },
  ]},
  { city: 'San Francisco', state: 'California', code: 'SFO', airports: [
    { name: 'San Francisco International Airport', code: 'SFO' },
    { name: 'Oakland International Airport', code: 'OAK' },
    { name: 'Norman Y. Mineta San José Airport', code: 'SJC' },
  ]},
  { city: 'Miami', state: 'Florida', code: 'MIA', airports: [
    { name: 'Miami International Airport', code: 'MIA' },
    { name: 'Fort Lauderdale Airport', code: 'FLL' },
  ]},
  { city: 'Seoul', state: 'South Korea', code: 'SEL', airports: [
    { name: 'Incheon International Airport', code: 'ICN' },
    { name: 'Gimpo International Airport', code: 'GMP' },
  ]},
  { city: 'Hong Kong', state: 'Hong Kong', code: 'HKG', airports: [
    { name: 'Hong Kong International Airport', code: 'HKG' },
  ]},
  { city: 'Bangkok', state: 'Thailand', code: 'BKK', airports: [
    { name: 'Suvarnabhumi Airport', code: 'BKK' },
    { name: 'Don Mueang International Airport', code: 'DMK' },
  ]},
  { city: 'Sydney', state: 'Australia', code: 'SYD', airports: [
    { name: 'Sydney Kingsford Smith Airport', code: 'SYD' },
  ]},
  { city: 'Melbourne', state: 'Australia', code: 'MEL', airports: [
    { name: 'Melbourne Airport', code: 'MEL' },
    { name: 'Avalon Airport', code: 'AVV' },
  ]},
  { city: 'Toronto', state: 'Canada', code: 'YTO', airports: [
    { name: 'Toronto Pearson International Airport', code: 'YYZ' },
    { name: 'Billy Bishop Toronto City Airport', code: 'YTZ' },
  ]},
  { city: 'Barcelona', state: 'Spain', code: 'BCN', airports: [
    { name: 'Josep Tarradellas Barcelona-El Prat Airport', code: 'BCN' },
  ]},
  { city: 'Madrid', state: 'Spain', code: 'MAD', airports: [
    { name: 'Adolfo Suárez Madrid-Barajas Airport', code: 'MAD' },
  ]},
  { city: 'Rome', state: 'Italy', code: 'ROM', airports: [
    { name: 'Leonardo da Vinci International Airport', code: 'FCO' },
    { name: 'Ciampino Airport', code: 'CIA' },
  ]},
  { city: 'Munich', state: 'Germany', code: 'MUC', airports: [
    { name: 'Munich Airport', code: 'MUC' },
  ]},
  { city: 'Zurich', state: 'Switzerland', code: 'ZRH', airports: [
    { name: 'Zurich Airport', code: 'ZRH' },
  ]},
  { city: 'Vienna', state: 'Austria', code: 'VIE', airports: [
    { name: 'Vienna International Airport', code: 'VIE' },
  ]},
  { city: 'Copenhagen', state: 'Denmark', code: 'CPH', airports: [
    { name: 'Copenhagen Airport', code: 'CPH' },
  ]},
  { city: 'Stockholm', state: 'Sweden', code: 'STO', airports: [
    { name: 'Stockholm Arlanda Airport', code: 'ARN' },
    { name: 'Stockholm Bromma Airport', code: 'BMA' },
  ]},
  { city: 'Oslo', state: 'Norway', code: 'OSL', airports: [
    { name: 'Oslo Gardermoen Airport', code: 'OSL' },
  ]},
  { city: 'Helsinki', state: 'Finland', code: 'HEL', airports: [
    { name: 'Helsinki-Vantaa Airport', code: 'HEL' },
  ]},
  { city: 'Brussels', state: 'Belgium', code: 'BRU', airports: [
    { name: 'Brussels Airport', code: 'BRU' },
    { name: 'Brussels South Charleroi Airport', code: 'CRL' },
  ]},
  { city: 'Kyiv', state: 'Ukraine', code: 'IEV', airports: [
    { name: 'Boryspil International Airport', code: 'KBP' },
    { name: 'Igor Sikorsky Kyiv International Airport', code: 'IEV' },
  ]},
  { city: 'Warsaw', state: 'Poland', code: 'WAW', airports: [
    { name: 'Warsaw Chopin Airport', code: 'WAW' },
  ]},
  { city: 'Prague', state: 'Czech Republic', code: 'PRG', airports: [
    { name: 'Václav Havel Airport Prague', code: 'PRG' },
  ]},
  { city: 'Budapest', state: 'Hungary', code: 'BUD', airports: [
    { name: 'Budapest Ferenc Liszt International Airport', code: 'BUD' },
  ]},
  { city: 'Athens', state: 'Greece', code: 'ATH', airports: [
    { name: 'Athens International Airport', code: 'ATH' },
  ]},
  { city: 'Lisbon', state: 'Portugal', code: 'LIS', airports: [
    { name: 'Lisbon Humberto Delgado Airport', code: 'LIS' },
  ]},
  { city: 'Moscow', state: 'Russia', code: 'MOW', airports: [
    { name: 'Sheremetyevo International Airport', code: 'SVO' },
    { name: 'Domodedovo International Airport', code: 'DME' },
    { name: 'Vnukovo International Airport', code: 'VKO' },
  ]},
  { city: 'São Paulo', state: 'Brazil', code: 'SAO', airports: [
    { name: 'São Paulo–Guarulhos International Airport', code: 'GRU' },
    { name: 'Congonhas Airport', code: 'CGH' },
  ]},
  { city: 'Mexico City', state: 'Mexico', code: 'MEX', airports: [
    { name: 'Benito Juárez International Airport', code: 'MEX' },
    { name: 'Felipe Ángeles International Airport', code: 'NLU' },
  ]},
  { city: 'Buenos Aires', state: 'Argentina', code: 'BUE', airports: [
    { name: 'Ministro Pistarini International Airport', code: 'EZE' },
    { name: 'Jorge Newbery Airfield', code: 'AEP' },
  ]},
  { city: 'Cairo', state: 'Egypt', code: 'CAI', airports: [
    { name: 'Cairo International Airport', code: 'CAI' },
  ]},
  { city: 'Johannesburg', state: 'South Africa', code: 'JNB', airports: [
    { name: 'O.R. Tambo International Airport', code: 'JNB' },
  ]},
  { city: 'Nairobi', state: 'Kenya', code: 'NBO', airports: [
    { name: 'Jomo Kenyatta International Airport', code: 'NBO' },
  ]},
  { city: 'Mumbai', state: 'India', code: 'BOM', airports: [
    { name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM' },
  ]},
  { city: 'Delhi', state: 'India', code: 'DEL', airports: [
    { name: 'Indira Gandhi International Airport', code: 'DEL' },
  ]},
  { city: 'Beijing', state: 'China', code: 'BJS', airports: [
    { name: 'Beijing Capital International Airport', code: 'PEK' },
    { name: 'Beijing Daxing International Airport', code: 'PKX' },
  ]},
  { city: 'Shanghai', state: 'China', code: 'SHA', airports: [
    { name: 'Shanghai Pudong International Airport', code: 'PVG' },
    { name: 'Shanghai Hongqiao International Airport', code: 'SHA' },
  ]},
  { city: 'Kuala Lumpur', state: 'Malaysia', code: 'KUL', airports: [
    { name: 'Kuala Lumpur International Airport', code: 'KUL' },
  ]},
  { city: 'Jakarta', state: 'Indonesia', code: 'JKT', airports: [
    { name: 'Soekarno-Hatta International Airport', code: 'CGK' },
  ]},
]

function filterResults(query: string): CityResult[] {
  const q = query.toLowerCase().trim()
  // "contains" matching only activates for 2+ character queries to avoid
  // noise like London appearing when the user types a single "n"
  const allowContains = q.length >= 2

  const scored: Array<{ result: CityResult; score: number }> = []

  for (const city of AIRPORTS_DATA) {
    const cityLower  = city.city.toLowerCase()
    const stateLower = city.state.toLowerCase()
    const codeLower  = city.code.toLowerCase()

    // ── City-level score ─────────────────────────────────────────────────
    let cityScore = Infinity
    if (codeLower === q) {
      cityScore = 1                                          // city IATA exact
    } else if (cityLower.startsWith(q)) {
      cityScore = 2                                          // city name starts-with
    } else if (allowContains && (cityLower.includes(q) || stateLower.includes(q) || codeLower.includes(q))) {
      cityScore = 4                                          // city name / state contains
    }

    // ── Airport-level score ──────────────────────────────────────────────
    const scoredAirports: Array<{ airport: Airport; score: number }> = []
    for (const airport of city.airports) {
      const nameLower  = airport.name.toLowerCase()
      const aCodeLower = airport.code.toLowerCase()
      let aScore = Infinity
      if (aCodeLower === q) {
        aScore = 1                                           // IATA exact match
      } else if (nameLower.startsWith(q)) {
        aScore = 3                                           // airport name starts-with
      } else if (allowContains && (nameLower.includes(q) || aCodeLower.includes(q))) {
        aScore = 5                                           // airport name / code contains
      }
      if (aScore < Infinity) scoredAirports.push({ airport, score: aScore })
    }

    const bestAirportScore = scoredAirports.length > 0
      ? Math.min(...scoredAirports.map(a => a.score))
      : Infinity

    const groupScore = Math.min(cityScore, bestAirportScore)
    if (groupScore === Infinity) continue  // no match at all — skip

    // When the city itself matched show all its airports;
    // when only specific airports matched show just those (sorted by relevance)
    const airports = cityScore <= bestAirportScore
      ? city.airports
      : scoredAirports.sort((a, b) => a.score - b.score).map(a => a.airport)

    scored.push({ result: { ...city, airports }, score: groupScore })
  }

  // Primary sort: relevance score asc; secondary: city name asc
  scored.sort((a, b) => a.score - b.score || a.result.city.localeCompare(b.result.city))
  return scored.map(s => s.result)
}

// ─── Types ───────────────────────────────────────────────────────────────────
type SearchState = 'default' | 'open' | 'loading'

// ─── Inline chevron ──────────────────────────────────────────────────────────
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Spinner ─────────────────────────────────────────────────────────────────
function Spinner() {
  return <span className="sb-spinner" aria-hidden="true" />
}

// ─── SearchBar ───────────────────────────────────────────────────────────────
function SearchBar() {
  const navigate = useNavigate()
  const [state, setState] = useState<SearchState>('default')
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const hasQuery = query.trim().length > 0
  const showDropdown = query.trim().length >= 3
  const results = showDropdown ? filterResults(query) : []
  const isActive = state === 'open' && hasQuery
  const isHighlighted = isFocused || hasQuery
  const isLoading = state === 'loading'

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setState('default')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setState('open')
  }, [])

  const handleFocus = useCallback(() => {
    setState('open')
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as Node | null
    if (containerRef.current && relatedTarget && containerRef.current.contains(relatedTarget)) {
      return
    }
    setIsFocused(false)
  }, [])

  const handleCancel = useCallback(() => {
    setQuery('')
    setState('default')
    inputRef.current?.blur()
  }, [])

  const handleSearch = useCallback(() => {
    if (!hasQuery) return
    setState('loading')
    setTimeout(() => {
      setState('default')
      setQuery('')
    }, 1500)
  }, [hasQuery])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') handleCancel()
  }, [handleSearch, handleCancel])

  return (
    <div className="sb-wrapper" ref={containerRef}>
      {/* Pill */}
      <div className={`sb-pill${isHighlighted ? ' sb-pill--open' : ''}`}>
        <img src={SEARCH_ICON} alt="" width={24} height={24} className="sb-search-icon" />

        <input
          ref={inputRef}
          type="text"
          className="sb-input"
          placeholder="Try London, Singapore, Dubai..."
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-label="Search airports"
          aria-expanded={isActive}
          aria-autocomplete="list"
        />

        {hasQuery && (
          <button
            className="sb-cancel-btn"
            onClick={handleCancel}
            aria-label="Clear search"
          >
            <img src={CANCEL_ICON} alt="" width={20} height={20} />
          </button>
        )}

        <button
          className={`sb-search-btn${isHighlighted ? ' sb-search-btn--active' : ''}`}
          onClick={handleSearch}
          disabled={isLoading}
          aria-label="Search"
        >
          {isLoading ? <Spinner /> : 'Search'}
        </button>
      </div>

      {/* Dropdown — only when 3+ chars typed and results exist */}
      {isActive && showDropdown && results.length > 0 && (
        <div className="sb-dropdown" role="listbox">
          <div className="sb-dropdown-scroll">
          {results.map((city, ci) => (
            <div key={city.code} className="sb-city-group" style={{ animationDelay: `${ci * 0.04}s` }}>
              <div className="sb-city-header">
                <img src={LOCATION_ICON} alt="" width={24} height={24} className="sb-city-icon" />
                <div className="sb-city-meta">
                  <span className="sb-city-name">{city.city}</span>
                  <span className="sb-city-state">{city.state}</span>
                </div>
                <span className="sb-city-code">{city.code}</span>
              </div>

              <ul className="sb-airport-list" role="group">
                {city.airports.map((airport, ai) => (
                  <li key={airport.code}>
                    <button
                      className="sb-airport-row"
                      role="option"
                      aria-selected={false}
                      onClick={() => navigate(`/airport/${airport.code}`)}
                    >
                      <img src={AIRPORT_ICON} alt="" width={16} height={16} className="sb-airport-icon" />
                      <span className="sb-airport-name">{airport.name}</span>
                      <span className="sb-airport-code">{airport.code}</span>
                      <span className="sb-arrow-icon"><ChevronRight /></span>
                    </button>
                    {ai < city.airports.length - 1 && <div className="sb-airport-sep" />}
                  </li>
                ))}
              </ul>

              {ci < results.length - 1 && <div className="sb-group-sep" />}
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Popular airport chips — only when search is empty */}
      {query.length === 0 && (
        <>
          <span className="sb-quick-label">Popular airports</span>
          <div className="sb-quick-chips">
            {[
              { label: 'New York',   code: 'JFK' },
              { label: 'London',     code: 'LHR' },
              { label: 'Amsterdam',  code: 'AMS' },
              { label: 'Tokyo',      code: 'HND' },
            ].map(({ label, code }) => (
              <button
                key={code}
                className="sb-quick-chip"
                onClick={() => navigate(`/airport/${code}`)}
              >
                {label} · {code}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ─── HeroSearch ──────────────────────────────────────────────────────────────
export default function HeroSearch() {
  return (
    <div className="hero-card">
      <div className="hero-inner-highlight" />

      <div className="hero-left">
        <div className="hero-heading">
          <span className="hero-heading-line1">Explore any airport,</span>
          <span className="hero-heading-line2">instantly.</span>
        </div>

        <p className="hero-subtitle">
          Airport intelligence, local time context, weather, and flight pulse for airports worldwide.
        </p>

        <SearchBar />
      </div>

      <img
        src={airportIllustration}
        alt="Airport illustration"
        className="hero-illustration"
      />
    </div>
  )
}
