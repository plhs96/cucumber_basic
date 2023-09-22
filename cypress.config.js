const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    baseUrl: "https://organization-stg.tabulalearning.net/",
    specPattern: "**/*.feature",
    chromeWebSecurity: false
  },
});
