import FlightCard from './FlightCard'
import SectionHeading from './SectionHeading'

// Sección de vuelos: recibe el resultado de useQuery (GraphQL) y muestra
// el estado correspondiente: cargando, error, vacío o la lista.
export default function FlightList({ flights, loading, error }) {
  return (
    <section className="container section detail-section">
      <SectionHeading
        eyebrow="LLEGA HASTA ALLÁ"
        title="Vuelos disponibles"
        description="Opciones simuladas para ayudarte a comparar horarios y precios."
      />
      {loading && <div className="state-message">Consultando vuelos con GraphQL...</div>}
      {error && (
        <div className="state-message error-message">
          No se pudieron consultar los vuelos: {error.message}
        </div>
      )}
      {!loading && !error && flights.length === 0 && (
        <div className="state-message">No hay vuelos simulados para este destino.</div>
      )}
      {flights.length > 0 && (
        <div className="flight-grid">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </section>
  )
}
