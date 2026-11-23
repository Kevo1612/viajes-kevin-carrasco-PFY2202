import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { apolloClient } from './services/apolloClient'
import './index.css'

// Arranca el "backend" simulado (MSW). MSW registra un Service Worker que
// intercepta las peticiones REST (/api/...) y GraphQL (/graphql) del navegador
// y responde con los datos de src/mocks/handlers.js.
async function enableMocking() {
  const { worker } = await import('./mocks/browser')
  return worker.start({
    onUnhandledRequest: 'bypass', // las peticiones que no son del mock pasan normal
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` }
  })
}

function renderApp() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      {/* ApolloProvider permite usar useQuery (GraphQL) en cualquier componente */}
      <ApolloProvider client={apolloClient}>
        {/* HashRouter usa URLs con "#", compatibles con GitHub Pages */}
        <HashRouter>
          <App />
        </HashRouter>
      </ApolloProvider>
    </React.StrictMode>
  )
}

// Si el mock falla, igual se muestra la app (con mensajes de error en pantalla)
enableMocking()
  .catch((error) => console.error('No fue posible iniciar el backend simulado:', error))
  .finally(renderApp)
