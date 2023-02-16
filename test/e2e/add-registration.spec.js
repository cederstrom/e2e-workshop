/// <reference types="cypress" />

context(
  "Given the consultant Stina and no registered time for 2023-02-14",
  () => {
    before(() => {
      // Will get the fixture from `test/e2e/fixtures/empty-storage.json` and overwrite storage with it
      cy.task("db:empty");
      cy.visit("/");
      cy.getById("select-consultant").select("Stina Johansson");
    });

    describe("When registering 200 min spent on Programming @ New app for 2023-02-14", () => {
      before(() => {
        cy.getById("input-date").type("2023-02-14");
        cy.getById("select-project").select("New app");
        cy.getById("input-activity").type("Programming");
        cy.getById("input-duration").type("200 min");
        cy.contains("button", "Add registration").click();
      });

      beforeEach(() => cy.visit("/"));

      it("Then the list of registrations shall contain the one new registration", () => {
        cy.get(".registration").should("have.length", 1);
      });

      it("Then registration should have Stinas name", () => {
        cy.get("dl > :nth-child(2)")
          .first()
          .should("have.text", "Stina Johansson");
      });

      it("Then registration should be for the project New app", () => {
        cy.get(".registration > :nth-child(2)")
          .first()
          .should("have.text", "New app");
      });

      it("Then registration should be for the activit Programming", () => {
        cy.get(".registration > :nth-child(1)")
          .first()
          .should("have.text", "Programming");
      });

      it("Then registration should have 200 min", () => {
        cy.get(".registration > :nth-child(4)").should(
          "have.text",
          "200 minutes"
        );
      });

      it("Then total registered time should be 200 min", () => {
        cy.get("dl > :nth-child(6)").should("have.text", "200 minutes");
      });
    });
  }
);
