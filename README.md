# <img src="https://oddox.org/assets/logo-dark.png" width="150px" alt="Oddox" /> DASHBOARD

[![Build](https://img.shields.io/travis/oddoxorg/dashboard.svg)](https://travis-ci.org/oddoxorg/dashboard)
[![Codacy grade](https://img.shields.io/codacy/grade/5442d4e80cdf462584e74cdbe9d82063.svg)](https://www.codacy.com/app/amdelamar/dashboard)
[![Codecov](https://img.shields.io/codecov/c/github/oddoxorg/dashboard.svg)](https://codecov.io/gh/oddoxorg/dashboard)
[![Greenkeeper badge](https://badges.greenkeeper.io/oddoxorg/dashboard.svg)](https://greenkeeper.io/)
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/oddoxorg/dashboard/blob/master/LICENSE)

Offline-first dashboard for authors to manage their Oddox blog

> Live Example: coming soon...

## Usage

Dashboard is a SPA (single page app) for authors with an [Oddox](https://github.com/oddoxorg/oddox) blog to write, sync, and manage their content.

This project is still in development but stay tuned. The first version will be made available once the main features are complete.

Oddox Dashboard should be included with your deployment of the [server](https://github.com/oddoxorg/oddox). Please see [Oddox's README](https://github.com/oddoxorg/oddox) for full deployment details.

## Features

 * Offline-first, write post and sync later
 * Multi-Author blog system with roles. Author, Admin, Co-Authors, and Editors
 * Organize blog posts by Tags, Categories, Featured, Authors, and Dates
 * Trash can to recover deleted posts 

## Planned Features

 * Mobile app, with Ionic or Cordova?
 * Desktop app with Electron or Chromium?
 * Themes (Light / Dark)

## Deployment

For developers, run the commands below to get started.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Technologies Used

 * [Vuejs 2](https://vuejs.org/) JavaScript Framework
 * [PouchDB 6](https://pouchdb.com/) NoSQL Database
 * [Osseous](https://austindelamar.com/osseous/) CSS Framework
 * [Icomoon](http://icomoon.io/) Icons
 * [Webpack 3](https://webpack.js.org/) Module Bundler
 * [Node.js 8](https://nodejs.org/) for local dev and testing

## License

[Apache 2.0](https://github.com/oddoxorg/dashboard/blob/master/LICENSE)
