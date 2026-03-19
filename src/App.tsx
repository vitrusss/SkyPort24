import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AirportPage from './pages/AirportPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/airport/:iata" element={<AirportPage />} />
    </Routes>
  )
}
