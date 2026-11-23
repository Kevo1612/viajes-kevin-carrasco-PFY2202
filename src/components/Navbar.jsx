import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" aria-label="ViajaPlus, inicio">
          <span className="brand-mark">✦</span>
          <span>
            viaja<span>plus</span>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/destinos">Destinos</NavLink>
        </nav>
        <Link to="/destinos" className="nav-cta">
          Explorar viajes <span>↗</span>
        </Link>
      </div>
    </header>
  )
}
