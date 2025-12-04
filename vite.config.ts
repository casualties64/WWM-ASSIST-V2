import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base ./ allows deployment to any path (GitHub Pages, etc)
  base: './',
  resolve: {
    alias: {
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable source maps for easier debugging
    emptyOutDir: true,
    target: 'es2020', // Ensure compatibility with modern browsers
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react', '@discord/embedded-app-sdk']
  }
});