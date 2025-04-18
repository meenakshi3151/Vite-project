import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    // ... other server options
    allowedHosts: true, // Allow all hosts
    // OR
    // allowedHosts: ['localhost', '127.0.0.1', 'yourdomain.com'] // Allow specific hosts
  }

})
