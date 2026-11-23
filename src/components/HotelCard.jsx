import { formatCLP } from '../utils/format'

export default function HotelCard({ hotel }) {
  return (
    <article className="hotel-card">
      <img src={hotel.image} alt={hotel.name} loading="lazy" />
      <div className="hotel-info">
        <div className="hotel-category">{hotel.category}</div>
        <h3>{hotel.name}</h3>
        <div className="hotel-rating">
          ★ {hotel.rating.toFixed(1)} <span>· {hotel.availableDates}</span>
        </div>
        <div className="amenities">
          {hotel.amenities.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="hotel-price">
          <div>
            <strong>{formatCLP(hotel.pricePerNight)}</strong>
            <small> / noche</small>
          </div>
          {/* Disponibilidad real que viene desde GraphQL */}
          <span className="availability">
            <i /> {hotel.availability}
          </span>
        </div>
      </div>
    </article>
  )
}
