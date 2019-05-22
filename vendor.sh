#!/bin/bash
set -e

cp -rv node_modules/govuk-frontend/assets/ static/govuk-frontend/
mv static/govuk-frontend/images/favicon.ico static/
cp -v node_modules/govuk-frontend/components/header/header.js static/govuk-frontend/scripts
yarn run uglifyjs --compress --mangle -o static/govuk-frontend/scripts/header.min.js static/govuk-frontend/scripts/header.js
