import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // --- TAMBAHAN PENTING (OBAT ERROR TADI) ---
    // Izinkan domain abang diakses
    allowedHosts: [
      'cloudsup.id',
      'www.cloudsup.id'
    ],
    host: true, // Ini biar dia listen ke 0.0.0.0 (IP publik)
    // ------------------------------------------

    // Setting Proxy biar dianggap satu domain
    proxy: {
      '/v1': {
        target: 'https://cloudsup.id:5000', // Alamat Backend Flask Abang
        changeOrigin: true,
        secure: false,
      }
    }
  }
})