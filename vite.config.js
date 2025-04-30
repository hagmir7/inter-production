import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  darkMode: 'class',
  build:{
    outDir: "react-dist"
  },
  server:{
    port: 5123,
    strictPort: true,
    // allowedHosts: [
    //   'dac5-160-176-215-52.ngrok-free.app',  // Add ngrok's host here
    //   'localhost',                             // Optionally keep localhost
    //   '127.0.0.1',                             // Optionally keep 127.0.0.1
    // ],
  }
  

})
