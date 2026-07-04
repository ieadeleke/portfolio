import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    // Allow any ngrok tunnel subdomain (they rotate) to reach the dev server
    allowedHosts: ['.ngrok-free.dev'],
  },
})
