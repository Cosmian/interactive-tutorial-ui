import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { auth0_config } from "./utils/config.ts";

const providerConfig: Auth0ProviderOptions = {
  domain: auth0_config.domain,
  clientId: auth0_config.client,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
