const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local';
      const envConfig = dotenv.config({ path: envFile }).parsed || {};

      config.env = {
        ...config.env,
        ...envConfig,
      };

      config.baseUrl = envConfig.BASE_URL || config.baseUrl;

      return config;
    },
  },
});