export const auth0_config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
  customDomain: import.meta.env.VITE_AUTH0_CUSTOM_DOMAIN as string,
  client: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
};
