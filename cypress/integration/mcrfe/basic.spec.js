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

  describe("Progressive enhancement", () => {
    describe("Header", () => {
      beforeEach(() => {
        cy.viewport("iphone-6");
        cy.visit("/organisations/T92");
      });

      it.skip("appears open when JS is turned off", () => {
        throw Error(
          "Unimplemented, waiting on https://github.com/cypress-io/cypress/issues/1611."
        );
      });

      it("appears closed and can be toggled open", () => {
        cy.contains("Sign out").should("not.be.visible");
        cy.contains("Menu").click();
        cy.contains("Sign out").should("be.visible");
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

      cy.contains("Switch on experimental single-page mode")
        .should("exist")
        .click();

      cy.contains("Switch off experimental single-page mode").should("exist");
    });
  });

  describe("With spaMode cookie set", () => {
    beforeEach(() => {
      cy.setCookie("spaMode", "true");
    });

    afterEach(() => {
      cy.contains("Switch off experimental single-page mode").should("exist");
    });

    common();
  });
});
