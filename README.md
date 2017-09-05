# Rant-Dashboard

[![Build](https://img.shields.io/travis/RamblingWare/Rant-Dashboard.svg)](https://travis-ci.org/RamblingWare/Rant-Dashboard)
[![Code Climate](https://img.shields.io/codeclimate/github/RamblingWare/Rant-Dashboard.svg)](https://codeclimate.com/github/RamblingWare/Rant-Dashboard)
[![Codecov](https://img.shields.io/codecov/c/github/RamblingWare/Rant-Dashboard.svg)](https://codecov.io/gh/RamblingWare/Rant-Dashboard)
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/RamblingWare/Rant-Dashboard/blob/master/LICENSE)

Blog management dashboard on CouchDB.

> Live Example: coming soon...

## Features

 *  Multi-Author blog system with editable roles (Author, Editor, Owner, Admin)
 *  Organize blog posts by Tags, Categories, Featured, Authors, and Dates
 *  SEO & Social Media ready with Facebook (OpenGraph), Twitter, Google+ tags
 *  2FA security and pbkdf2 hashed passwords
 
## Planned Features

 * Containerize with Docker
 * Offline-first Vuejs + PouchDB dashboard
 * Freemarker Theme Templates

## Usage

This project is still in development. It is not easily modifiable for "new" blogs, but stay tuned. I plan to make a self-installing version once the main features are complete. Essentially, this is a web client for the [Rant](https://github.com/RamblingWare/Rant) system.

Please use see [Rant's README](https://github.com/RamblingWare/Rant) for full deployment details. 

### Getting Started

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

 * [Vuejs 2.4.2](https://vuejs.org/) JavaScript Framework
 * [PouchDB 6.3.4](https://pouchdb.com/) NoSQL Database
 * [Bootstrap 4.0.0](https://getbootstrap.com/) CSS Framework
 * [Font Awesome 4.7](http://fontawesome.io/) Icons
 * [Webpack 3.5](https://webpack.js.org/) Module Bundler
 * [Node.js 8.4](https://nodejs.org/) for local dev and testing

## License

[Apache 2.0](https://github.com/RamblingWare/Rant-Dashboard/blob/master/LICENSE)
