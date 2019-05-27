# mcrfe [![Build Status](https://travis-ci.org/tvararu/mcrfe.svg?branch=master)](https://travis-ci.org/tvararu/mcrfe) [![Maintainability](https://api.codeclimate.com/v1/badges/ab146cc9b0db611b1147/maintainability)](https://codeclimate.com/github/tvararu/mcrfe/maintainability)

Install correct version of `node` using `nvm`:

```bash
nvm <.nvmrc
```

Install dependencies for frontend and API:

```bash
npm i
cd api && npm i
```

Run the API (see also [`api/README.md`](api/README.md)):

```bash
npm run api
open http://localhost:4000/graphiql
```

Run the frontend locally (basic auth: `local:local`):

```bash
npm run dev
open http://localhost:3000
```

Deploy:

```bash
npm run deploy
```

Run jest unit tests:

```bash
npm run test -- --watch --notify
```

Run cypress end to end tests:

```bash
npx cypress open
```

Analyze the client-side JS bundle:

```bash
BUNDLE_ANALYZE=client npm run build
```

Vendor `govuk-frontend` assets (re-run when the version updates):

```bash
npm run vendor
git add static && git commit -m "Update vendored govuk-frontend assets"
```

Boot entire dev setup using `tmuxinator`:

```bash
tmuxinator local
```

## License

[MIT](LICENSE.txt).
