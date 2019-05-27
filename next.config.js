const withSass = require("@zeit/next-sass");
const withSize = require("next-size");

module.exports = withSize(
  withSass({
    env: {
      AUTH: process.env.AUTH,
      API_URL: process.env.API_URL
    },
    target: "serverless"
  })
);
