const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }, 
    experimentalStudio: true,
    video: true,
    supportFile: 'cypress/support/e2e.js',
    baseUrl: 'http://localhost:3000'
  },
});
