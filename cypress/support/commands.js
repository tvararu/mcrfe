import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();

const auth = {
  username: Cypress.env("BASIC_AUTH_USERNAME") || "local",
  password: Cypress.env("BASIC_AUTH_PASSWORD") || "local"
};

Cypress.Commands.overwrite("visit", (originalFn, url, options) =>
  originalFn(url, { auth, ...options })
);
