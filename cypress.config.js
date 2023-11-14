const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  env: {
    ...process.env,
  },
  e2e: {
    baseUrl: 'https://serverest.dev',
    specPattern: "cypress/api/*.spec.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
