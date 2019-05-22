#!/bin/bash
set -e

cp -rv node_modules/govuk-frontend/assets/ static/govuk-frontend/
cp -v node_modules/govuk-frontend/all.js static/govuk-frontend/scripts
yarn run uglifyjs --compress --mangle -o static/govuk-frontend/scripts/all.min.js static/govuk-frontend/scripts/all.js
