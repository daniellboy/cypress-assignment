const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://beta-app.zujudigital.com',
    loginUrl : '/#sign-in',
    loginEmail : 'zujutest+automation@gmail.com',
    loginPassword : 'TestAuto123',
    testIsolation : false
  },
})
