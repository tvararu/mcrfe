const auth = {
  username: "local",
  password: "local"
};

const schoolName = "2Schools Consortium";

describe("Basic tests", () => {
  describe("Fresh visit", () => {
    it("Organisations page", () => {
      cy.visit("/", { auth });

      cy.contains("Organisations").should("exist");
      cy.contains(schoolName).should("exist");

      cy.reload();

      cy.contains("Organisations").should("exist");
      cy.contains(schoolName).should("exist");
    });

    it("Organisation page", () => {
      cy.visit("/organisations?providerCode=T92", {
        auth
      });

      cy.contains(schoolName).should("exist");
      cy.contains("Courses").should("exist");

      cy.reload();

      cy.contains(schoolName).should("exist");
      cy.contains("Courses").should("exist");
    });

    it("Courses page", () => {
      cy.visit("/organisations/courses?providerCode=T92", {
        auth
      });

      cy.contains("Courses").should("exist");
      cy.contains("Primary (X130)").should("exist");

      cy.reload();

      cy.contains("Courses").should("exist");
      cy.contains("Primary (X130)").should("exist");
    });
  });

  describe("Navigation between pages", () => {
    it("Organisations to Organisation", () => {
      cy.visit("/", { auth });

      cy.contains(schoolName).click();

      cy.get("h1").should("contain", schoolName);

      cy.reload();

      cy.get("h1").should("contain", schoolName);
    });

    it("Organisation to Courses", () => {
      cy.visit("/organisations?providerCode=T92", {
        auth
      });

      cy.contains("Courses").click();

      cy.get("h1").should("contain", "Courses");

      cy.reload();

      cy.get("h1").should("contain", "Courses");
    });
  });
});
