const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require("cors");
const { postgraphile } = require("postgraphile");

const {
  DATABASE_URL = "postgres:///manage",
  PG_SSL = false,
  PORT = 4000,
  AUTH = false
} = process.env;

const PG_URL = `${DATABASE_URL}${PG_SSL ? "?ssl=true" : ""}`;

const app = express();

app.use(cors());

if (AUTH) {
  app.use(
    basicAuth({
      users: { graphql: AUTH },
      challenge: true,
      unauthorizedResponse: () => JSON.stringify({ error: "Access denied" })
    })
  );
}

app.use(
  postgraphile(PG_URL, "public", {
    dynamicJson: true,
    graphiql: true,
    enhanceGraphiql: true
  })
);

app.listen(PORT);

console.log(`Server listening on ${PORT}`);
