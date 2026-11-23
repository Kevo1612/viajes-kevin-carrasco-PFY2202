import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // La ruta relativa permite publicar también en GitHub Pages.
  base: './'
})