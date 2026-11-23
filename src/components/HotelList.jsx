import HotelCard from './HotelCard'
import SectionHeading from './SectionHeading'

// Sección de hoteles: misma idea que FlightList.
export default function HotelList({ hotels, loading, error }) {
  return (
    <section className="container section hotels-section">
      <SectionHeading
        eyebrow="DESCANSA Y DISFRUTA"
        title="Hoteles recomendados"
        description="Alojamientos disponibles para completar tu experiencia."
      />
      {loading && <div className="state-message">Consultando hoteles con GraphQL...</div>}
      {error && (
        <div className="state-message error-message">
          No se pudieron consultar los hoteles: {error.message}
        </div>
      )}
      {!loading && !error && hotels.length === 0 && (
        <div className="state-message">No hay hoteles simulados para este destino.</div>
      )}
      {hotels.length > 0 && (
        <div className="hotel-grid">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </section>
  )
}
