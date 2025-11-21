import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Setting Proxy biar dianggap satu domain
    proxy: {
      '/v1': {
        target: 'http://127.0.0.1:5000', // Alamat Backend Flask Abang
        changeOrigin: true,
        secure: false,
      }
    }
  }
})