import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Matches bookmark http://127.0.0.1:5179/ — run "npm start" or start-dev.cmd first
  server: {
    host: '127.0.0.1',
    port: 5179,
    strictPort: true,
    open: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: false,
    open: true,
  },
})
