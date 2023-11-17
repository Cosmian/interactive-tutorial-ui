import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    auth0_username: process.env.AUTH0_USERNAME,
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
    auth0_domain: process.env.VITE_AUTH0_DOMAIN,
    auth0_audience: process.env.VITE_AUTH0_AUDIENCE,
    auth0_scope: process.env.VITE_AUTH0_SCOPE,
    auth0_client_id: process.env.VITE_AUTH0_CLIENT_ID,
  },
});
