import { useState } from 'react'
import DestinationCard from '../components/DestinationCard'
import { useDestinations } from '../hooks/useDestinations'

export default function Destinations() {
  const { destinations, loading, error } = useDestinations()

  // Estado de los filtros
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('Todos')

  // Lista de regiones sin repetir, calculada desde los datos de la API
  const regions = ['Todos', ...new Set(destinations.map((item) => item.region))]

  // Destinos que coinciden con la búsqueda y la región elegida
  const filtered = destinations.filter((item) => {
    const text = `${item.name} ${item.country}`.toLowerCase()
    const matchesSearch = text.includes(search.toLowerCase())
    const matchesRegion = region === 'Todos' || item.region === region
    return matchesSearch && matchesRegion
  })

  function clearFilters() {
    setSearch('')
    setRegion('Todos')
  }

  return (
    <section className="page-section container">
      <div className="page-intro">
        <div className="eyebrow">ELIGE TU PRÓXIMA AVENTURA</div>
        <h1>
          Todos los <em>destinos.</em>
        </h1>
        <p>Desde escapadas cercanas hasta lugares que parecen de otro mundo. ¿A dónde vamos?</p>
      </div>

      <div className="filter-bar">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar destino o país..."
            aria-label="Buscar destino o país"
          />
        </label>
        <label className="filter-select">
          <span>Región</span>
          <select value={region} onChange={(event) => setRegion(event.target.value)}>
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {loading && <div className="state-message">Cargando destinos...</div>}
      {error && <div className="state-message error-message">{error}</div>}

      {!loading && !error && (
        <>
          <div className="results-count">
            {filtered.length}{' '}
            {filtered.length === 1 ? 'destino encontrado' : 'destinos encontrados'}
          </div>

          {filtered.length > 0 ? (
            <div className="destination-grid">
              {filtered.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No encontramos destinos</h3>
              <p>Prueba con otro nombre o región.</p>
              <button className="button button-outline" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
