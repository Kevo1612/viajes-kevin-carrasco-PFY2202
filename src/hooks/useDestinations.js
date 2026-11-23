import { useEffect, useState } from 'react'

// Hook que obtiene la lista de destinos desde la API REST mock: GET /api/destinations
export function useDestinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // [] = se ejecuta una sola vez, cuando el componente se monta
  useEffect(() => {
    const controller = new AbortController()

    async function loadDestinations() {
      try {
        setLoading(true)
        const response = await fetch('/api/destinations', { signal: controller.signal })
        if (!response.ok) throw new Error('No fue posible obtener los destinos.')
        const data = await response.json()
        setDestinations(data.destinations)
        setError('')
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message || 'Ocurrió un error.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadDestinations()
    return () => controller.abort()
  }, [])

  return { destinations, loading, error }
}
