import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'react',
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
      '/oauth': {
        target: 'http://localhost:8080'
      },
    },
  }
})
