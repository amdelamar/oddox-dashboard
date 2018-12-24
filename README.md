# Oddox Dashboard

[![Build](https://img.shields.io/travis/amdelamar/oddox-dashboard.svg)](https://travis-ci.org/amdelamar/oddox-dashboard)
[![Codacy grade](https://img.shields.io/codacy/grade/5442d4e80cdf462584e74cdbe9d82063.svg)](https://www.codacy.com/app/amdelamar/oddox-dashboard)
[![Codecov](https://img.shields.io/codecov/c/github/amdelamar/oddox-dashboard.svg)](https://codecov.io/gh/amdelamar/oddox-dashboard)

Offline-first dashboard for authors to manage their Oddox blog.

## About

Dashboard is an offline-first web app for authors with an [Oddox](https://github.com/amdelamar/oddox-server) blog to write, sync, and manage their content.

Its a SPA (single page app) built on [Vuejs](https://vuejs.org/) and [PouchDB](https://pouchdb.com/). Users login to their CouchDB database with their URL, Username, and Password. Then they replicate the content to PouchDB which saves their posts in localstorage. After making edits or publishing new content, they can click 'Sync' to update CouchDB with PouchDB's replication ability.

This project is still in development but stay tuned. The first version will be made available once the main features are complete. Please see [Oddox's README](https://github.com/amdelamar/oddox-server) for full deployment details.

## Build and Deploy

For developers, run the commands below to get started.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run all tests
npm test

# run just unit tests
npm run unit

# run just e2e tests
npm run e2e
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Tech Stack

 * [Vuejs 2.+](https://vuejs.org/) JavaScript Framework
 * [PouchDB 6.+](https://pouchdb.com/) NoSQL Database
 * [Osseous 2.+](https://austindelamar.com/osseous/) CSS Framework
 * [Icomoon](http://icomoon.io/) Icons
 * [Webpack 3.+](https://webpack.js.org/) Module Bundler
 * [Node.js 10.+](https://nodejs.org/) for local dev and testing
 * [Nginx 1.+](https://nginx.org/) for production

[Apache 2.0](https://github.com/amdelamar/oddox-dashboard/blob/master/LICENSE) License
