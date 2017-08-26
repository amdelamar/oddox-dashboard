# Rant-Dashboard

[![Codecov](https://img.shields.io/codecov/c/github/RamblingWare/Rant-Dashboard.svg)](https://codecov.io/gh/RamblingWare/Rant-Dashboard)
[![License](https://img.shields.io/:license-apache-blue.svg)](https://github.com/RamblingWare/Rant-Dashboard/blob/master/LICENSE)

Blog management dashboard for the [Rant](https://github.com/RamblingWare/Rant) backend.

> Live Example: coming soon...

## Features

 *  Multi-Author blog system with editable roles (Author, Editor, Owner, Admin)
 *  Organize blog posts by Tags, Categories, Featured, Authors, and Dates
 *  SEO & Social Media ready with Facebook (OpenGraph), Twitter, Google+ tags
 *  2FA security and pbkdf2 hashed passwords
 
## Planned Features

 * Containerize with Docker
 * Offline-first Vuejs+PouchDB dashboard
 * Freemarker Theme Templates

## Usage

This project is still in development. It is not easily modifiable for "new" blogs, but stay tuned. I plan to make a self-installing version once the main features are complete.

## Manually Build

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Technologies Used

 * [Vuejs 2.0](https://vuejs.org/)
 * [Webpack 3.5](https://webpack.js.org/)
 * [PouchDB 6](https://pouchdb.com/)
 * [Bootstrap 4](https://getbootstrap.com/)
 * [Font Awesome 4.7](http://fontawesome.io/)

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License

[Apache 2.0](https://github.com/RamblingWare/Rant-Dashboard/blob/master/LICENSE)