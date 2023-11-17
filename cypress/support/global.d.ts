/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Logs in via Auth0 login page
     */
    loginToAuth0(username: string, password: string): Chainable<any>;
  }
}
