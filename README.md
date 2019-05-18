# mcrfe

Run the server (see [`server/README.md`](server/README.md)).

Run the frontend:

```bash
now dev
open http://localhost:3000
```

Deploy:

```bash
now
```

Analyze the client-side JS bundle:

```bash
BUNDLE_ANALYZE=client yarn build
```

Vendor `govuk-frontend` assets (re-run when the version updates):

```bash
cp -nrv node_modules/govuk-frontend/assets/ static/govuk-frontend/
git add static && git commit -m "Update vendored govuk-frontend assets"
```

## License

[MIT](LICENSE.txt).
