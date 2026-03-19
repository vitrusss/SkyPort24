import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">Copyright © 2026</span>
      <span className="footer-credit">
        Designed &amp; built by{' '}
        <a
          href="https://vitrus.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          Vitrus
        </a>
      </span>
    </footer>
  )
}
