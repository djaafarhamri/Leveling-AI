import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  // Ensure base is set correctly, use '/' if your app is deployed at the root
  base: '/',
})