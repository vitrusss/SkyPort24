import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">Copyright © 2026</span>
        <span className="footer-credit">
          Designed &amp; built by{' '}
          <a
            href="https://www.linkedin.com/in/vitaliitrus/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Vitrus
          </a>
        </span>
      </div>
    </footer>
  )
}
