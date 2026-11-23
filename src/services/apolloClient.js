import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

// Cliente GraphQL. Las consultas se envían a /graphql, donde MSW (mock)
// las intercepta y responde. InMemoryCache guarda los resultados en memoria.
export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache()
})
