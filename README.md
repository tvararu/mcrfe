# mcrfe [![Build Status](https://travis-ci.org/tvararu/mcrfe.svg?branch=master)](https://travis-ci.org/tvararu/mcrfe)

Install correct version of `node` using `nvm`:

```bash
nvm <.nvmrc
```

Install dependencies for frontend and API:

```bash
yarn
```

Run the API (see also [`api/README.md`](api/README.md)):

```bash
yarn api
open http://localhost:4000/graphiql
```

Run the frontend locally (basic auth: `local:local`):

```bash
yarn dev
open http://localhost:3000
```

Deploy:

```bash
yarn deploy
```

Run jest unit tests:

```bash
yarn test --watch --notify
```

Run cypress end to end tests:

```bash
yarn run cypress open
```

Analyze the client-side JS bundle:

```bash
BUNDLE_ANALYZE=client yarn build
```

Vendor `govuk-frontend` assets (re-run when the version updates):

```bash
yarn vendor
git add static && git commit -m "Update vendored govuk-frontend assets"
```

## License

[MIT](LICENSE.txt).
