# laytonstreet.co.uk

This app is hosted on GitHub Pages. The state of the `master` branch is what users will see when they visit [laytonstreet.co.uk](https://laytonstreet.co.uk) (or [laytonstreet.github.io](https://laytonstreet.github.io)).

## Branches

As `master` is reserved for serving up the app on GitHub pages `source` is the main branch.

Please don't commit directly to `master`.

## Deployment

[gh-pages](https://www.npmjs.com/package/gh-pages) is used for deployments.

To deploy the app `cd` into your checked out project directory and run `npm run deploy`.

This will build and deploy from the current state of your local project so make sure you're on the correct branch (probably `source`) and that you don't have any uncommitted changes.
