import { Link } from 'react-router-dom'
import { formatCLP } from '../utils/format'

export default function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <Link
        to={`/destinos/${destination.id}`}
        className="destination-image-link"
        aria-label={`Ver ${destination.name}`}
      >
        <img
          src={destination.image}
          alt={`Paisaje de ${destination.name}`}
          className="destination-image"
          loading="lazy"
        />
        {destination.tag && <span className="image-tag">{destination.tag}</span>}
        <span className="image-arrow">↗</span>
      </Link>
      <div className="destination-content">
        <div className="destination-region">
          {destination.region} · {destination.country}
        </div>
        <h3>
          <Link to={`/destinos/${destination.id}`}>{destination.name}</Link>
        </h3>
        <p>{destination.description}</p>
        <div className="destination-bottom">
          <span>
            Desde <strong>{formatCLP(destination.priceFrom)}</strong>
          </span>
          <Link to={`/destinos/${destination.id}`} className="text-link">
            Ver viaje <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
