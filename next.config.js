const withSass = require("@zeit/next-sass");

module.exports = withSass({
  env: {
    AUTH: process.env.AUTH,
    API_URL: process.env.API_URL
  },
  target: "serverless"
});
