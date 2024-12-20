import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const apiUrl = process.env.API_URL;


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': `${apiUrl}`,
    },
  },
})