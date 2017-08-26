// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import PouchDB from 'pouchdb-browser'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'

// Components
import Navbar from './components/Navbar';
Vue.component('app-navbar', Navbar);
import Sidebar from './components/Sidebar';
Vue.component('app-sidebar', Sidebar);
import Footer from './components/Footer';
Vue.component('app-footer', Footer);
import Content from './components/Content';
Vue.component('app-content', Content);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Router,
  template: '<App/>',
  components: { App }
})
