const path = require("path");
const withSass = require("@zeit/next-sass");
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = withBundleAnalyzer(
  withSass({
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
    },
    analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: "static",
        reportFilename: "../bundles/server.html"
      },
      browser: {
        analyzerMode: "static",
        reportFilename: "../bundles/client.html"
      }
    },
    env: {
      AUTH: process.env.AUTH,
      API_URL: process.env.API_URL
    },
    target: "serverless"
  })
);
