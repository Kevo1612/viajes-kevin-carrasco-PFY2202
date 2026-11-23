import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/" className="brand footer-brand">
          <span className="brand-mark">✦</span>
          <span>
            viaja<span>plus</span>
          </span>
        </Link>
        <p>Tu próximo viaje comienza aquí.</p>
        <small>© 2026 ViajaPlus.</small>
      </div>
    </footer>
  )
}
