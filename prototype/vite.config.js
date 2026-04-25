import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deck “Open Live Demo” points here in dev: http://127.0.0.1:5180
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5180,
    strictPort: true,
    open: false,
  },
})
