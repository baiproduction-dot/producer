import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  // Use the provided key or fallback to environment variable
  const API_KEY = env.API_KEY || 'AIzaSyDXqxCXPB2b3BDEogCwLwgZ2wqwVjgtF7w';

  return {
    plugins: [react()],
    define: {
      // Prevents "Uncaught ReferenceError: process is not defined"
      'process.env': {}, 
      // Safely inject the API key
      'process.env.API_KEY': JSON.stringify(API_KEY)
    },
    build: {
      outDir: 'dist'
    }
  };
});