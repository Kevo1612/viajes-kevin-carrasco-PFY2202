import { Link } from 'react-router-dom'
import DestinationCard from '../components/DestinationCard'
import SectionHeading from '../components/SectionHeading'
import { useDestinations } from '../hooks/useDestinations'

export default function Home() {
  const { destinations, loading, error } = useDestinations()

  // Hace scroll suave hasta la sección de destinos destacados
  function scrollToDestinations() {
    document.getElementById('destinos')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="hero-kicker">
              <span /> INSPIRACIÓN PARA TU PRÓXIMA AVENTURA
            </span>
            <h1>
              El mundo
              <br />
              te está <em>esperando.</em>
            </h1>
            <p>Encuentra ese lugar que llevas tiempo soñando. Nosotros te ayudamos a llegar.</p>
            <div className="hero-actions">
              <Link to="/destinos" className="button button-primary">
                Explorar destinos <span>↗</span>
              </Link>
              <button type="button" className="hero-secondary" onClick={scrollToDestinations}>
                Descubre más <span>↓</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="destinos">
        <SectionHeading
          eyebrow="LUGARES QUE INSPIRAN"
          title="Destinos destacados"
          description="Una selección de lugares increíbles para comenzar a planificar tu próxima escapada."
          action={
            <Link to="/destinos" className="text-link">
              Ver todos <span>→</span>
            </Link>
          }
        />
        {loading && <div className="state-message">Cargando destinos...</div>}
        {error && <div className="state-message error-message">{error}</div>}
        {!loading && !error && (
          <div className="destination-grid">
            {/* Solo los 3 primeros destinos como destacados */}
            {destinations.slice(0, 3).map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        )}
      </section>

      <section className="inspiration-band">
        <div className="container inspiration-inner">
          <div>
            <div className="eyebrow light-eyebrow">NO ES SOLO UN VIAJE</div>
            <h2>
              Son momentos
              <br />
              <em>que se quedan contigo.</em>
            </h2>
          </div>
          <Link to="/destinos" className="button button-light">
            Encuentra tu destino <span>↗</span>
          </Link>
        </div>
      </section>
    </>
  )
}
