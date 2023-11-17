/// <reference types="cypress" />

Cypress.on("uncaught:exception", (_err, _runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Must be redirected to login page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("display login button", () => {
    cy.get("button").should("have.text", "Create an account or login");
  });
});
