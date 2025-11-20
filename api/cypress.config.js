const { defineConfig } = require("cypress");
const { deleteUserByEmail } = require('./cypress/support/database.js')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        }
      })
    },
    viewportWidth: 1440,
    viewportHeight: 900,
    baseUrl: 'http://localhost:3333'
  },
});
