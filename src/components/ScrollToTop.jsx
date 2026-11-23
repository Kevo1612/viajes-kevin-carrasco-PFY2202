import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router no sube el scroll al cambiar de página, así que lo hacemos
// nosotros cada vez que cambia la ruta.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
