import { Link } from 'react-router-dom'

// Página que se muestra cuando la ruta no existe (path="*" en App.jsx)
export default function NotFound() {
  return (
    <section className="container empty-state page-section">
      <span>404</span>
      <h1>Parece que te perdiste.</h1>
      <p>Esta página no está en nuestro mapa.</p>
      <Link to="/" className="button button-primary">
        Volver al inicio
      </Link>
    </section>
  )
}
