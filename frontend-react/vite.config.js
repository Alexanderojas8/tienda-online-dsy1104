
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',

    setupFiles: './src/test/setup.js',

    include: [
      'src/**/*.test.{js,jsx}',
      'src/**/*.spec.{js,jsx}',
    ],

    coverage: {
      provider: 'v8',

      reporter: ['text', 'html'],

      include: ['src/**/*.{js,jsx}'],

      exclude: [
        'src/**/*.test.{js,jsx}',
        'src/**/*.spec.{js,jsx}',
        'src/test/**',
      ],
    },
  },
})
