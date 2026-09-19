import { defineConfig, mergeConfig } from 'vite'
import { defineConfig as defineVitestConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  server: {
    host: true, // ou '0.0.0.0'
    port: 5173,
    cors: true
  },
  define: {
    global: {
      global: 'window',
    }
  }
})

export default mergeConfig(
  viteConfig,
  defineVitestConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/test/setup.ts',
    },
  })
)
