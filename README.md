# dashboard

[![Build](https://img.shields.io/travis/oddoxorg/dashboard.svg)](https://travis-ci.org/oddoxorg/dashboard)
[![Code Climate](https://img.shields.io/codeclimate/github/oddoxorg/dashboard.svg)](https://codeclimate.com/github/oddoxorg/dashboard)
[![Codecov](https://img.shields.io/codecov/c/github/oddoxorg/dashboard.svg)](https://codecov.io/gh/oddoxorg/dashboard)
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/oddoxorg/dashboard/blob/master/LICENSE)

Oddox admin dashboard.

> Live Example: coming soon...

## Features

 *  Multi-Author blog system with editable roles (Author, Editor, Owner, Admin)
 *  Organize blog posts by Tags, Categories, Featured, Authors, and Dates
 *  SEO & Social Media ready with Facebook (OpenGraph), Twitter, Google+ tags
 *  HTTP/2, HTTPS, and pbkdf2 ([RFC2898](https://www.ietf.org/rfc/rfc2898.txt)) hashed passwords

## Planned Features

* Offline-first dashboard for authors to manage blog
* Freemarker Theme Templates

## Usage

This project is still in development. It is not easily modifiable for "new" blogs, but stay tuned. I plan to make a self-installing version once the main features are complete. Essentially, this is a admin console for the [Rant](https://github.com/oddoxorg/oddox) blog platform.

Please use see [Oddox's README](https://github.com/oddoxorg/oddox) for full deployment details.

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

[Apache 2.0](https://github.com/oddoxorg/dashboard/blob/master/LICENSE)
