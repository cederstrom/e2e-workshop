/// <reference types="cypress" />

context(
  "Given a consultant Bruce has registered 200 min Programming @ New app",
  () => {
    before(() => {
      // Will get the fixture from `test/e2e/fixtures/one-registration.json` and overwrite storage with it
      //cy.task("db:apply-fixture", "one-registration");

      cy.task("db:empty");
      cy.visit("/");
      cy.getById("select-consultant").select("Bruce Wayne");
      cy.getById("input-date").type("2023-02-14");
      cy.getById("select-project").select("New app");
      cy.getById("input-activity").type("Programming");
      cy.getById("input-duration").type("200 min");
      cy.contains("button", "Add registration").click();
    });

    describe("When visiting site", () => {
      it("Then should show one day with one registartion for 200 min on Programming @ New app", () => {
        cy.get(".day").should("have.length", 1);
        cy.get(".registration").should("have.length", 1);
        cy.get("dl > :nth-child(2)").first().should("have.text", "Bruce Wayne");
        cy.get(".registration > :nth-child(2)")
          .first()
          .should("have.text", "New app");
        cy.get(".registration > :nth-child(1)")
          .first()
          .should("have.text", "Programming");
        cy.get(".registration > :nth-child(4)")
          .first()
          .should("have.text", "200 minutes");
        cy.get(".registration > :nth-child(4)").should(
          "have.text",
          "200 minutes"
        );
      });
    });
  }
);
