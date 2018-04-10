// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './views/App'
import Router from './router'
import store from './store'
import { shorten } from './filters/shorten'

// Require css framework files
import './assets/vendor/osseous/2.0.1/osseous.min.css'
// import './assets/vendor/osseous/2.0.1/osseous.min.js'
import './assets/vendor/animate/3.5.2/animate.min.css'
// import './assets/vendor/highlight/9.12.0/highlight.pack.js'
import './assets/vendor/highlight/9.12.0/styles/default.min.css'
import './assets/vendor/icomoon/icomoon.min.css'

// Require vue-wysiwyg
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import wysiwyg from 'vue-wysiwyg'
Vue.use(wysiwyg, {})

Vue.config.productionTip = false
Vue.filter('shorten', shorten)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store, // inject $store into every component
  router: Router,
  template: '<App/>',
  components: { App }
})
