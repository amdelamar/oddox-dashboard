<template>
  <nav id="app-navbar" class="navbar border-bottom background-gradient-grey">
      <div class="navbar-body padding-left padding-right">

        <div class="nav-item-logo">
            <a href="/#/">
              <img class="margin-right" src="static/logo.png" height="35px" width="35px" alt="Logo" />
              <span class="text-medium text-thin text-uppercase text-wide">{{ title }}</span>
            </a>
        </div>
        <div class="nav-small-menu">
            <a class="nav-item" title="Open Menu" href="javascript:openSidebar()">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 7h16v2H0V7zm0-6h16v2H0V1zm0 12h16v2H0v-2z" fill-rule="evenodd"></path></svg>
            </a>
        </div>

        <div class="nav-group nav-large-menu">
          <a class="nav-item text-capitalize" href="#"><code>Offline</code></a>

          <a class="button dropdown margin" href="/#/">Username &#9662;
            <div class="dropdown-body border">
              <span class="text-capitalize border-bottom">Signed in as <em>{{ username }}</em></span>
              <a href="/#/profile" class="">My Profile</a>
              <a href="/#/settings" class="">Settings</a>
              <a href="/#/logout" class="">Logout</a>
            </div>
          </a>

          <button class="button margin-left" v-on:click="sync">Sync Now</button>
        </div>
    	</div>
  </nav>
</template>

<script>
import store from '../store'

export default {
  name: 'app-navbar',
  data () {
    return {
      title: 'Dashboard',
      username: 'username',
      status: ''
    }
  },
  created () {
    this.status = 'Offline'
  },
  methods: {
    sync () {
      console.log('Attempting to syncrhonize databases...')
      store.synchronize()
    }
  }
}
</script>

<style>
.navbar {
  position: relative;
  display: block;
}
#app-navbar .dropdown-body {
  min-width: 23rem;
  left: -0.1rem;
}
</style>
