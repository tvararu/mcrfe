# mcrfe

Run the server (see [`server/README.md`](server/README.md)).

Run the frontend locally (basic auth: `local:local`):

```bash
now dev
open http://localhost:3000
```

Deploy:

```bash
now
```

To run jest unit tests:

```bash
yarn test --watch --notify
```

To run cypress end to end tests:

```bash
yarn run cypress open
```

Analyze the client-side JS bundle:

```bash
BUNDLE_ANALYZE=client yarn build
```

Vendor `govuk-frontend` assets (re-run when the version updates):

```bash
cp -nrv node_modules/govuk-frontend/assets/ static/govuk-frontend/
cp -v node_modules/govuk-frontend/all.js static/govuk-frontend/scripts
git add static && git commit -m "Update vendored govuk-frontend assets"
```

## License

[MIT](LICENSE.txt).
