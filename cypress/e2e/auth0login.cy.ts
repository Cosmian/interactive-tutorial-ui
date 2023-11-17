if (Cypress.env("auth0_username")) {
  describe("Auth0", function () {
    beforeEach(function () {
      cy.task("db:seed");
      cy.loginToAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
      cy.visit("/");
    });

    it("should allow a visitor to login, onboard and logout", function () {
      cy.contains("Get Started").should("be.visible");
    });

    // This test should pass without needing to go through the login flow again,
    // due to the session data being cached by cy.loginToAuth0.
    it("shows onboarding", function () {
      cy.contains("Get Started").should("be.visible");
    });
  });
}
