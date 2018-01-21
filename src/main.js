// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './views/App'
import Router from './router'
import store from './store'

import './assets/vendor/osseous/1.2.0/osseous.min.css'
// import './assets/vendor/osseous/1.2.0/osseous.min.js'
import './assets/vendor/animate/3.5.2/animate.min.css'
// import './assets/vendor/highlight/9.12.0/highlight.pack.js'
import './assets/vendor/highlight/9.12.0/styles/default.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, // inject $store into every component
  router: Router,
  template: '<App/>',
  components: { App }
})
