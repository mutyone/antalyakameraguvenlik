import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          kepez: path.resolve(__dirname, 'ilceler/kepez-guvenlik-kamerasi.html'),
          muratpasa: path.resolve(__dirname, 'ilceler/muratpasa-guvenlik-kamerasi.html'),
          konyaalti: path.resolve(__dirname, 'ilceler/konyaalti-guvenlik-kamerasi.html'),
          dosemaalti: path.resolve(__dirname, 'ilceler/dosemealti-guvenlik-kamerasi.html'),
          aksu: path.resolve(__dirname, 'ilceler/aksu-guvenlik-kamerasi.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
