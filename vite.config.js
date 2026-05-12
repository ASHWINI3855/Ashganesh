import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // ── Target modern browsers (enables smaller output) ──────────────────
    target: 'es2020',

    // ── Assets: inline small files < 4 KB (avoids extra network round-trips)
    assetsInlineLimit: 4096,

    // ── Chunk splitting for optimal caching ─────────────────────────────
    rollupOptions: {
      output: {
        // Content-hash filenames → long-term caching (immutable assets)
        entryFileNames:  'assets/[name]-[hash].js',
        chunkFileNames:  'assets/[name]-[hash].js',
        assetFileNames:  'assets/[name]-[hash][extname]',
      },
    },

    // ── Source maps in production (optional: remove for tighter bundle)
    sourcemap: false,

    // ── Minification
    minify: 'esbuild',
  },

  // ── Development optimizations ──────────────────────────────────────────
  server: {
    // Enable HTTP/2 for parallel asset delivery in dev
    headers: {
      // Tell browser to cache static assets aggressively during dev
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },

  // ── Static asset handling ──────────────────────────────────────────────
  assetsInclude: ['**/*.webp', '**/*.avif', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
})
