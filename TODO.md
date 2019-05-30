- [ ] Investigate speeding up slow GraphQL queries (caching?
  fragments?)
- [ ] Shrink down the PostGraphile schema (don't expose everything
  because they're not all necessary)
- [ ] Implement whitelisted queries (disallows API users from
  generating very complex queries)
- [ ] Investigate deploying a serverless endpoint with another GraphQL
  framework to compare to PostGraphile
- [ ] Fix the hard-coded "QTS Full Time" on course entries
- [ ] Implement DFE Signin (at least on localhost)
- [ ] Add CSS Modules to the Sass compiler (should result in automatic
  purging of unused CSS)
- [ ] Use polyfill.io instead of babel env (should result in a smaller
  build)
- [ ] Finish implementing LocationsCreate (branch: `forms`)
- [ ] Implement an end to end working `POST` form, both with and
  without client-side JS
- [ ] Add CSRF tokens to forms
- [ ] Configure CORS properly on the API and frontend
- [ ] Use a JWT token to communicate to the API instead of basic auth
  that is exposed on the frontend
- [ ] Add service worker + PWA capabilities
