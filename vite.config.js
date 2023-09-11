import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TODO-List',
        short_name: 'TODO-List',
        start_url: '/',
        display: 'standalone',
        background_color: '#ff0000',
        lang: 'en',
        scope: '/',
        icons: [
          {
            src: '../public/logo192.png',
            sizes: '48x48 72x72 96x96 128x128 256x256 512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        theme_color: '#242424',
      },
    }),
  ],
});
