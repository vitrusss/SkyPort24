import Header from '../components/Header/Header'
import HeroSearch from '../components/HeroSearch/HeroSearch'
import Footer from '../components/Footer/Footer'
import './LandingPage.css'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <Header />
        <div className="landing-gap-hero" />
        <HeroSearch />
        <div className="landing-gap-footer" />
        <Footer />
      </div>
    </div>
  )
}
