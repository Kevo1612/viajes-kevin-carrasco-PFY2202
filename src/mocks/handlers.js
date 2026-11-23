// MSW: http = endpoints REST, graphql = consultas GraphQL
import { http, HttpResponse, graphql } from 'msw'

// ---- Datos simulados ----

// Destinos (los entrega la API REST)
const destinations = [
  {
    id: '1',
    name: 'Cancún',
    country: 'México',
    region: 'Caribe',
    description: 'Playas de arena blanca, aguas turquesas y una cultura llena de historia.',
    activities: ['Snorkel en arrecifes', 'Visita a Chichén Itzá', 'Parques naturales'],
    duration: '5 a 7 días',
    priceFrom: 589000,
    image:
      'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?auto=format&fit=crop&w=1200&q=85',
    tag: 'Más elegido'
  },
  {
    id: '2',
    name: 'Río de Janeiro',
    country: 'Brasil',
    region: 'Sudamérica',
    description: 'Una ciudad vibrante entre montañas, playas icónicas y música.',
    activities: ['Cristo Redentor', 'Pan de Azúcar', 'Playas de Copacabana'],
    duration: '4 a 6 días',
    priceFrom: 429000,
    image:
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85',
    tag: 'Imperdible'
  },
  {
    id: '3',
    name: 'París',
    country: 'Francia',
    region: 'Europa',
    description: 'Arte, gastronomía y rincones románticos en la ciudad de la luz.',
    activities: ['Torre Eiffel', 'Museo del Louvre', 'Paseo por el Sena'],
    duration: '6 a 8 días',
    priceFrom: 1099000,
    image:
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',
    tag: 'Europa'
  },
  {
    id: '4',
    name: 'San Pedro de Atacama',
    country: 'Chile',
    region: 'Norte de Chile',
    description: 'Paisajes de otro planeta, salares, géiseres y cielos inolvidables.',
    activities: ['Valle de la Luna', 'Géiseres del Tatio', 'Lagunas altiplánicas'],
    duration: '3 a 5 días',
    priceFrom: 319000,
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
    tag: 'Naturaleza'
  },
  {
    id: '5',
    name: 'Machu Picchu',
    country: 'Perú',
    region: 'Sudamérica',
    description: 'Descubre la historia inca rodeado de montañas y naturaleza.',
    activities: ['Ciudadela de Machu Picchu', 'Valle Sagrado', 'Cusco histórico'],
    duration: '4 a 6 días',
    priceFrom: 679000,
    image:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=85',
    tag: 'Aventura'
  },
  {
    id: '6',
    name: 'Punta Cana',
    country: 'República Dominicana',
    region: 'Caribe',
    description: 'Descanso frente al mar, resorts y excursiones tropicales.',
    activities: ['Isla Saona', 'Playa Bávaro', 'Catamarán'],
    duration: '5 a 7 días',
    priceFrom: 749000,
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=85',
    tag: 'Todo incluido'
  }
]

// Vuelos (los entrega GraphQL). destinationId los relaciona con un destino
const flights = [
  {
    id: 'f1',
    destinationId: '1',
    airline: 'LATAM Airlines',
    departure: '08:35',
    arrival: '17:20',
    date: '12 dic 2026',
    duration: '8 h 45 min',
    stops: '1 escala',
    price: 389900,
    seats: 8
  },
  {
    id: 'f2',
    destinationId: '1',
    airline: 'Aerolínea del Pacífico',
    departure: '22:10',
    arrival: '07:40',
    date: '14 dic 2026',
    duration: '9 h 30 min',
    stops: 'Directo',
    price: 429900,
    seats: 4
  },
  {
    id: 'f3',
    destinationId: '2',
    airline: 'LATAM Airlines',
    departure: '09:15',
    arrival: '13:05',
    date: '18 dic 2026',
    duration: '3 h 50 min',
    stops: 'Directo',
    price: 219900,
    seats: 12
  },
  {
    id: 'f4',
    destinationId: '2',
    airline: 'Sky Airline',
    departure: '16:40',
    arrival: '22:15',
    date: '20 dic 2026',
    duration: '5 h 35 min',
    stops: '1 escala',
    price: 189900,
    seats: 6
  },
  {
    id: 'f5',
    destinationId: '3',
    airline: 'Air France',
    departure: '11:20',
    arrival: '06:50',
    date: '05 ene 2027',
    duration: '18 h 30 min',
    stops: '1 escala',
    price: 899900,
    seats: 5
  },
  {
    id: 'f6',
    destinationId: '4',
    airline: 'LATAM Airlines',
    departure: '07:00',
    arrival: '09:05',
    date: '09 ene 2027',
    duration: '2 h 05 min',
    stops: 'Directo',
    price: 149900,
    seats: 9
  },
  {
    id: 'f7',
    destinationId: '5',
    airline: 'LATAM Airlines',
    departure: '10:25',
    arrival: '14:10',
    date: '15 ene 2027',
    duration: '3 h 45 min',
    stops: 'Directo',
    price: 279900,
    seats: 7
  },
  {
    id: 'f8',
    destinationId: '6',
    airline: 'Aerolínea del Caribe',
    departure: '23:50',
    arrival: '08:30',
    date: '22 ene 2027',
    duration: '8 h 40 min',
    stops: '1 escala',
    price: 459900,
    seats: 3
  }
]

// Hoteles (los entrega GraphQL)
const hotels = [
  {
    id: 'h1',
    destinationId: '1',
    availableDates: '10 dic 2026 - 31 ene 2027',
    name: 'Mar Azul Resort & Spa',
    category: 'Resort 5 estrellas',
    rating: 4.9,
    pricePerNight: 119900,
    availability: 'Disponible',
    amenities: ['Piscina', 'Desayuno', 'Frente al mar'],
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h2',
    destinationId: '1',
    availableDates: '10 dic 2026 - 31 ene 2027',
    name: 'Casa Caribe Boutique',
    category: 'Hotel 4 estrellas',
    rating: 4.7,
    pricePerNight: 82900,
    availability: 'Disponible',
    amenities: ['Wi-Fi', 'Desayuno', 'Piscina'],
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h3',
    destinationId: '2',
    availableDates: '15 dic 2026 - 28 feb 2027',
    name: 'Copacabana View',
    category: 'Hotel 4 estrellas',
    rating: 4.8,
    pricePerNight: 89900,
    availability: 'Disponible',
    amenities: ['Vista al mar', 'Piscina', 'Wi-Fi'],
    image:
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h4',
    destinationId: '2',
    availableDates: '15 dic 2026 - 28 feb 2027',
    name: 'Rio Urban Stay',
    category: 'Hotel 3 estrellas',
    rating: 4.4,
    pricePerNight: 59900,
    availability: 'Pocas habitaciones',
    amenities: ['Wi-Fi', 'Desayuno'],
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h5',
    destinationId: '3',
    availableDates: '03 ene - 28 feb 2027',
    name: 'Hôtel Lumière',
    category: 'Hotel 4 estrellas',
    rating: 4.8,
    pricePerNight: 159900,
    availability: 'Disponible',
    amenities: ['Desayuno', 'Wi-Fi', 'Ubicación céntrica'],
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h6',
    destinationId: '4',
    availableDates: '05 ene - 31 mar 2027',
    name: 'Desert Stars Lodge',
    category: 'Lodge boutique',
    rating: 4.9,
    pricePerNight: 109900,
    availability: 'Disponible',
    amenities: ['Piscina', 'Desayuno', 'Excursiones'],
    image:
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h7',
    destinationId: '5',
    availableDates: '10 ene - 30 abr 2027',
    name: 'Andes Heritage Hotel',
    category: 'Hotel 4 estrellas',
    rating: 4.7,
    pricePerNight: 99900,
    availability: 'Disponible',
    amenities: ['Desayuno', 'Wi-Fi', 'Restaurante'],
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'h8',
    destinationId: '6',
    availableDates: '20 ene - 31 mar 2027',
    name: 'Caribbean Palm Resort',
    category: 'Resort 5 estrellas',
    rating: 4.9,
    pricePerNight: 149900,
    availability: 'Disponible',
    amenities: ['Todo incluido', 'Playa', 'Piscina'],
    image:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80'
  }
]

// ---- Endpoints simulados ----
export const handlers = [
  // REST: lista de destinos -> GET /api/destinations
  http.get('/api/destinations', () => {
    return HttpResponse.json({ destinations })
  }),

  // REST: un destino por id -> GET /api/destinations/:id
  http.get('/api/destinations/:id', ({ params }) => {
    const destination = destinations.find((item) => item.id === String(params.id))
    if (!destination) {
      return HttpResponse.json({ message: 'Destino no encontrado' }, { status: 404 })
    }
    return HttpResponse.json({ destination })
  }),

  // GraphQL: query GetFlights(destinationId) -> vuelos del destino
  graphql.query('GetFlights', ({ variables }) => {
    const items = flights
      .filter((flight) => flight.destinationId === String(variables.destinationId))
      .map((flight) => ({ ...flight, __typename: 'Flight' }))
    return HttpResponse.json({ data: { flights: items } })
  }),

  // GraphQL: query GetHotels(destinationId) -> hoteles del destino
  graphql.query('GetHotels', ({ variables }) => {
    const items = hotels
      .filter((hotel) => hotel.destinationId === String(variables.destinationId))
      .map((hotel) => ({ ...hotel, __typename: 'Hotel' }))
    return HttpResponse.json({ data: { hotels: items } })
  })
]
