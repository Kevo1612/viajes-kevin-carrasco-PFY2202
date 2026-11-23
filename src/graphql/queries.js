import { gql } from '@apollo/client'

// Consulta de vuelos de un destino (precio, fecha, asientos disponibles, etc.)
export const GET_FLIGHTS = gql`
  query GetFlights($destinationId: ID!) {
    flights(destinationId: $destinationId) {
      id
      airline
      departure
      arrival
      date
      duration
      stops
      price
      seats
    }
  }
`

// Consulta de hoteles de un destino (precio por noche, disponibilidad, etc.)
export const GET_HOTELS = gql`
  query GetHotels($destinationId: ID!) {
    hotels(destinationId: $destinationId) {
      id
      name
      category
      rating
      pricePerNight
      availability
      availableDates
      amenities
      image
    }
  }
`
