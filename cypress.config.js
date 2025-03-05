const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://katherineleyland2i.github.io/',  // 👈 Set your app's URL here
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // Add plugins or event listeners here if needed
    },
  },
})
