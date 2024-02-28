import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from "vite-plugin-pwa";

export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: "autoUpdate",
    outDir: "build",
    manifest: {
      name: "SaubolMed",
      short_name: "SaubolMed",
      theme_color: "#ffffff",
      icons: [
        {
          src: "favicon-192x192.png", sizes: "192x192", type: "image/png",
        },
        {
          src: "favicon-256x256.png", sizes: "256x256", type: "image/png",
        },
        {
          src: "favicon-512x512.png", sizes: "512x512", type: "image/png",
        }
      ],
    },
  })],
  build: {
    outDir: "build"
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: true
  }

})
