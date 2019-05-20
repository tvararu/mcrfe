const schoolName = "2Schools Consortium";

describe("Basic tests", () => {
  describe("Fresh visit", () => {
    it("Organisations", () => {
      cy.visit("/");

      cy.assertReloadAssert(() => {
        cy.contains("Organisations").should("exist");
        cy.contains(schoolName).should("exist");
      });

      cy.matchImageSnapshot({ capture: "viewport" });
    });

    it("Organisation", () => {
      cy.visit("/organisations/T92");

      cy.assertReloadAssert(() => {
        cy.contains(schoolName).should("exist");
        cy.contains("Courses").should("exist");
      });

      cy.matchImageSnapshot();
    });

    it("Courses", () => {
      cy.visit("/organisations/T92/courses");

      cy.assertReloadAssert(() => {
        cy.contains("Courses").should("exist");
        cy.contains("Primary (X130)").should("exist");
      });

      cy.matchImageSnapshot();
    });
  });

  describe("Navigation between pages", () => {
    it("Organisations to Organisation", () => {
      cy.visit("/");

      cy.contains(schoolName).click();

      cy.assertReloadAssert(() => {
        cy.get("h1").should("contain", schoolName);
      });
    });

    it("Organisation to Courses", () => {
      cy.visit("/organisations/T92");

      cy.contains("Courses").click();

      cy.assertReloadAssert(() => {
        cy.get("h1").should("contain", "Courses");
      });
    });
  });
});
