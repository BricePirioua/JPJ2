import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/JPJ2/', // Ajoutez ceci - doit correspondre au nom de votre dépôt
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
