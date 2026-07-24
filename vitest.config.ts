import react from '@vitejs/plugin-react'
import {defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': import.meta.dirname
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        '**/*.config.*',
        '**/*.d.ts',
        '**/*.{spec,test}.*',
        '**/*.stories.*',
        'src/index.ts',
        '.storybook/**',
        'test-utils/**'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
})
