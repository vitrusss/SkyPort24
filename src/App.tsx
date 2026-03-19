import { Routes, Route, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AirportPage from './pages/AirportPage'

export default function App() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/airport/:iata" element={<AirportPage />} />
      </Routes>
    </div>
  )
}
