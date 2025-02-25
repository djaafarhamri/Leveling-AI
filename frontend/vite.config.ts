import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',
    emptyOutDir: true, // Clears the folder before building
  },
  // Ensure base is set correctly, use '/' if your app is deployed at the root
  base: '/',
})