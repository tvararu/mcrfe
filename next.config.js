const withSass = require("@zeit/next-sass");
const withSize = require("next-size");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const withOffline = require("next-offline");

module.exports = withOffline(
  withSize(
    withSass({
      webpack: config => {
        if (process.env.BUNDLE_ANALYZE) {
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: "static"
            })
          );
        }
        return config;
      },
      env: {
        AUTH: process.env.AUTH,
        API_URL: process.env.API_URL
      },
      target: "serverless"
    })
  )
);
