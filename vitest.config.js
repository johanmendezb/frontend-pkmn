// Minimal config that works with npx vitest
// Using inline config to avoid import issues with npx's isolated environment
const path = require('path')

module.exports = {
  test: {
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.tsx'],
    globals: true,
    css: true,
    // Ensure vitest can find local node_modules
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
