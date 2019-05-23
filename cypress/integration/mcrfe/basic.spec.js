const schoolName = "2Schools Consortium";

const common = () => {
  describe("Fresh visit", () => {
    it("Organisations", () => {
      cy.visit("/");

      cy.assertReloadAssert(() => {
        cy.contains("Organisations").should("exist");
        cy.contains(schoolName).should("exist");
      });
    });

    it("Organisation", () => {
      cy.visit("/organisations/T92");

      cy.assertReloadAssert(() => {
        cy.contains(schoolName).should("exist");
        cy.contains("Courses").should("exist");
      });
    });

    it("Courses", () => {
      cy.visit("/organisations/T92/courses");

      cy.assertReloadAssert(() => {
        cy.contains("Courses").should("exist");
        cy.contains("Primary (X130)").should("exist");
      });
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
};

describe("Basic tests with multi-page application", () => {
  common();
});

describe("Basic tests with single-page application", () => {
  describe("Switching on spaMode", () => {
    it("should work", () => {
      cy.visit("/organisations/T92");

      cy.get('[data-qa="spa-switch"]')
        .should("contain", "Switch on")
        .click();

      cy.get('[data-qa="spa-switch"]').should("contain", "Switch off");
    });
  });

  describe("With spaMode cookie set", () => {
    beforeEach(() => {
      cy.setCookie("spaMode", "true");
    });

    afterEach(() => {
      cy.get('[data-qa="spa-switch"]').should("contain", "Switch off");
    });

    common();
  });
});
