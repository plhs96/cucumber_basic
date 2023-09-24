const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
    },
    specPattern: "**/*.feature",
    chromeWebSecurity: false
  },
  "env":{
    "subDomainLink": "https://organization-stg.tabulalearning.net/",
    "primaryDomainLink": "https://signin.tabulalearning.net/"
  }
});
