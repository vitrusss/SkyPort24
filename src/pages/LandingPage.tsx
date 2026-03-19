import Header from '../components/Header/Header'
import HeroSearch from '../components/HeroSearch/HeroSearch'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <Header />
        <main className="landing-main">
          <HeroSearch />
        </main>
        <footer className="landing-footer">
          <span style={{ fontSize: '13px', color: '#A8A29E' }}>Copyright © 2026</span>
          <span style={{ fontSize: '13px', color: '#A8A29E' }}>
            Designed & built by{' '}
            <a
              href="https://www.linkedin.com/in/vitaliitrus/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#6C6760', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Vitrus
            </a>
          </span>
        </footer>
      </div>
    </div>
  )
}
