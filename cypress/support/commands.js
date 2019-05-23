import { addMatchImageSnapshotCommand } from "cypress-image-snapshot/command";

addMatchImageSnapshotCommand();

const auth = {
  username: "local",
  password: "local"
};

Cypress.Commands.overwrite("visit", (originalFn, url, options) =>
  originalFn(url, { auth, ...options })
);
