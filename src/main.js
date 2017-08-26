// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PouchDB from 'pouchdb-browser'

// Bootstrap
window.$ = window.jQuery = require('jquery')
import 'bootstrap/dist/css/bootstrap.min.css'

// Components
import Navbar from './components/Navbar';
Vue.component('navbar', Navbar);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
