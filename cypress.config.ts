import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 1000,
  fixturesFolder: 'test/e2e/fixtures',
  screenshotsFolder: 'test/e2e/screenshots',
  videosFolder: 'test/e2e/videos',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./test/e2e/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:3001',
    specPattern: 'test/e2e/**/*.spec.js',
    excludeSpecPattern: '**/test/e2e/examples/**',
    supportFile: 'test/e2e/support/index.js',
  },
})
