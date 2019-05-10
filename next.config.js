const path = require("path");
const withSass = require("@zeit/next-sass");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = withSass({
  webpack: config => {
    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, "/node_modules/govuk-frontend/assets"),
          to: path.join(__dirname, "/static/govuk-frontend/")
        }
      ])
    );

    return config;
  }
});
