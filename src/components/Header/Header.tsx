import { useNavigate, useLocation } from 'react-router-dom'
import logoImg from '../../assets/logo.png'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAirportPage = location.pathname.startsWith('/airport/')

  return (
    <header className="header">
      <div className="header-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logoImg} alt="SkyPort24 logo" className="header-logo-img" loading="eager" decoding="sync" />
        <span className="header-title">SkyPort24</span>
      </div>

      {isAirportPage && (
        <button className="header-back-btn" onClick={() => navigate('/')}>
          ← Back to search
        </button>
      )}
    </header>
  )
}
