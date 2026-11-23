import { formatCLP } from '../utils/format'

export default function FlightCard({ flight }) {
  return (
    <article className="offer-card flight-card">
      <div className="offer-topline">
        <span className="offer-icon">✈</span>
        <span className="offer-label">Vuelo disponible</span>
        <span className="offer-price">{formatCLP(flight.price)}</span>
      </div>
      <div className="flight-route">
        <div>
          <strong>{flight.departure}</strong>
          <small>Salida</small>
        </div>
        <div className="flight-line">
          <span>✈</span>
          <small>{flight.duration}</small>
        </div>
        <div className="align-right">
          <strong>{flight.arrival}</strong>
          <small>Llegada</small>
        </div>
      </div>
      <div className="offer-meta">
        <span>{flight.airline}</span>
        <span>{flight.date}</span>
        <span>{flight.stops}</span>
      </div>
      <div className="offer-foot">
        <span className="availability">
          <i /> {flight.seats} asientos disponibles
        </span>
        <span className="muted">Precio referencial</span>
      </div>
    </article>
  )
}
