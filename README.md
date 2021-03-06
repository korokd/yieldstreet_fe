This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The usual `start`, `build`, and `test` scripts are available.

## Pre-requisites

* You need to have `node` installed (preferrably latest LTS `14.x.y`);
* You also need either `yarn` or `npm` as well. I recommend `yarn`.

## Installing dependencies
At the root directory, run `yarn` or `npm install` to install the dependencies.

## Running locally (dev build)
Run `yarn start` or `npm run start`. Then, open localhost:3000 in your browser.

# Deliverable

## Building
* Run `yarn build` or `npm run build`

## Running production build locally
* Run `npx serve -s build`

## Inserting JS bundle in any other HTML document
* Look for the file `build/static/js/main.{hash}.js`, where `hash` is a hash generated by Webpack at build time
* Move it to the appropriate project directory;
* Add to the `<head/>` of the appropriate HTML document the following: `<script src="/new/relative/path/to/file"></script>`, replacing the value of the `src` attribute with the appropriate path.
