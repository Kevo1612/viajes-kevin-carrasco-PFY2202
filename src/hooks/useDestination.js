import { useEffect, useState } from 'react'

// Hook que obtiene UN destino desde la API REST mock: GET /api/destinations/:id
export function useDestination(id) {
  const [destination, setDestination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Se vuelve a ejecutar cada vez que cambia el id de la URL
  useEffect(() => {
    const controller = new AbortController() // cancela la petición si el componente se desmonta

    async function loadDestination() {
      try {
        setLoading(true)
        const response = await fetch(`/api/destinations/${id}`, { signal: controller.signal })
        if (!response.ok) throw new Error('No encontramos el destino solicitado.')
        const result = await response.json()
        setDestination(result.destination)
        setError('')
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadDestination()
    return () => controller.abort()
  }, [id])

  return { destination, loading, error }
}
