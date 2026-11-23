import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import FlightList from '../components/FlightList'
import HotelList from '../components/HotelList'
import { useDestination } from '../hooks/useDestination'
import { GET_FLIGHTS, GET_HOTELS } from '../graphql/queries'

// Página de detalle: el destino viene por REST y los vuelos/hoteles por GraphQL.
export default function DestinationDetail() {
  const { id } = useParams() // id del destino tomado de la URL /destinos/:id

  // REST
  const { destination, loading, error } = useDestination(id)

  // GraphQL (se envía el id como variable de la consulta)
  const flightsQuery = useQuery(GET_FLIGHTS, { variables: { destinationId: id } })
  const hotelsQuery = useQuery(GET_HOTELS, { variables: { destinationId: id } })

  if (loading) {
    return (
      <div className="container page-section">
        <div className="state-message">Cargando información del destino...</div>
      </div>
    )
  }

  if (error || !destination) {
    return (
      <div className="container page-section">
        <div className="empty-state">
          <h2>Destino no disponible</h2>
          <p>{error || 'No encontramos este destino.'}</p>
          <Link className="button button-primary" to="/destinos">
            Volver a destinos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section
        className="detail-hero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(5,22,39,.82), rgba(5,22,39,.12)), url("${destination.image}")`
        }}
      >
        <div className="container detail-hero-content">
          <Link to="/destinos" className="back-link">
            ← Todos los destinos
          </Link>
          <div className="eyebrow light-eyebrow">
            {destination.region} · {destination.country}
          </div>
          <h1>
            {destination.name}
            <em>.</em>
          </h1>
          <p>{destination.description}</p>
          <div className="detail-activities">
            {destination.activities.map((activity) => (
              <span key={activity}>✦ {activity}</span>
            ))}
          </div>
        </div>
      </section>

      <FlightList
        flights={flightsQuery.data?.flights ?? []}
        loading={flightsQuery.loading}
        error={flightsQuery.error}
      />
      <HotelList
        hotels={hotelsQuery.data?.hotels ?? []}
        loading={hotelsQuery.loading}
        error={hotelsQuery.error}
      />
    </>
  )
}
