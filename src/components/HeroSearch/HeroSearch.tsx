import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import './HeroSearch.css'
import airportIllustration from '../../assets/airport-illustration.png'
import { searchDestinations } from '../../utils/destinySearch'
import type { DestinyResult } from '../../utils/destinySearch'
import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon, Cancel01Icon } from '@hugeicons/core-free-icons'

// ─── Assets ─────────────────────────────────────────────────────────────────
const LOCATION_ICON = 'https://www.figma.com/api/mcp/asset/264faf33-ddee-48c4-90b4-db28bf68e6d0'
const AIRPORT_ICON  = 'https://www.figma.com/api/mcp/asset/ca4229dd-aa4a-4f9b-a59e-6f5b8707ee3a'


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

// ─── Group flat API results into city+airports clusters ──────────────────────
interface ResultGroup {
  city: DestinyResult
  airports: DestinyResult[]
}

function groupResults(suggestions: DestinyResult[]): ResultGroup[] {
  const groups: ResultGroup[] = []
  for (const result of suggestions) {
    if (result.type === 'city') {
      groups.push({ city: result, airports: [] })
    } else {
      const last = groups[groups.length - 1]
      if (result.child && last) {
        last.airports.push(result)
      } else {
        groups.push({ city: result, airports: [] })
      }
    }
  }
  return groups
}

// ─── SearchBar ───────────────────────────────────────────────────────────────
function SearchBar() {
  const navigate = useNavigate()
  const [state, setState] = useState<SearchState>('default')
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [suggestions, setSuggestions] = useState<DestinyResult[]>([])
  const [loading, setLoading] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })
  const hasQuery = query.trim().length > 0
  const isActive = state === 'open' && hasQuery
  const isHighlighted = isFocused || hasQuery
  const isLoading = state === 'loading'

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      const results = await searchDestinations(query)
      setSuggestions(results)
      setLoading(false)
    }, 250)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if ((suggestions.length > 0 || loading) && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect()
      setDropdownPos({
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      })
    }
  }, [suggestions, loading])

  const handleSelect = useCallback((result: DestinyResult) => {
    const iata = result.iata || result.searchTarget
    if (iata && iata.length === 3) {
      navigate(`/airport/${iata}`)
    }
  }, [navigate])

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
    setState('default')
  }, [hasQuery])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') handleCancel()
  }, [handleSearch, handleCancel])

  return (
    <div className="sb-wrapper" ref={(el) => { containerRef.current = el; wrapperRef.current = el }}>
      {/* Pill */}
      <div className={`sb-pill${isHighlighted ? ' sb-pill--open' : ''}`}>
        <HugeiconsIcon icon={Search01Icon} size={18} color="#A8A29E" />

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
            <HugeiconsIcon icon={Cancel01Icon} size={16} color="#A8A29E" />
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

      {/* Dropdown — only when 2+ chars typed */}
      {isActive && query.trim().length >= 2 && (loading || suggestions.length > 0) && (
        <div className="sb-dropdown" role="listbox" style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, width: dropdownPos.width, zIndex: 1000 }}>
          <div className="sb-dropdown-scroll">
            {loading && suggestions.length === 0 && (
              <div className="sb-city-header" style={{ cursor: 'default' }}>
                <div className="sb-city-meta">
                  <span className="sb-city-state">Searching...</span>
                </div>
              </div>
            )}
            {groupResults(suggestions).map((group, gi, groups) => (
              <div key={`${group.city.code}-${gi}`} className="sb-city-group" style={{ animationDelay: `${gi * 0.04}s` }}>
                <div className="sb-city-header">
                  {group.city.image ? (
                    <img
                      src={group.city.image}
                      alt=""
                      width={36}
                      height={36}
                      className="sb-city-icon"
                      style={{ objectFit: 'cover', borderRadius: 6 }}
                    />
                  ) : (
                    <img src={LOCATION_ICON} alt="" width={36} height={36} className="sb-city-icon" />
                  )}
                  <div className="sb-city-meta">
                    <span className="sb-city-name">{group.city.title}</span>
                    <span className="sb-city-state">{group.city.subTitle}</span>
                  </div>
                  <span className="sb-city-code">{group.city.iata || group.city.code}</span>
                </div>

                {group.airports.length > 0 && (
                  <ul className="sb-airport-list" role="group">
                    {group.airports.map((airport, ai) => (
                      <li key={airport.code}>
                        <button
                          className="sb-airport-row"
                          role="option"
                          aria-selected={false}
                          onClick={() => handleSelect(airport)}
                        >
                          <img src={AIRPORT_ICON} alt="" width={16} height={16} className="sb-airport-icon" />
                          <span className="sb-airport-name">{airport.title}</span>
                          <span className="sb-airport-code">{airport.iata || airport.code}</span>
                          <span className="sb-arrow-icon"><ChevronRight /></span>
                        </button>
                        {ai < group.airports.length - 1 && <div className="sb-airport-sep" />}
                      </li>
                    ))}
                  </ul>
                )}

                {gi < groups.length - 1 && <div className="sb-group-sep" />}
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
          <span>Airport intelligence, local time context, weather, and<br />flight pulse for airports worldwide.</span>
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
