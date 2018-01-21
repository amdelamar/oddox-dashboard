<template>
  <nav id="app-navbar" class="navbar border-bottom background-gradient-grey">
      <div class="navbar-body padding-left padding-right">

        <div class="nav-item-logo">
            <router-link to="/">
              <img class="margin-right" src="static/logo.png" height="35px" width="35px" alt="Logo" />
              <span class="text-medium text-thin text-uppercase text-wide">{{ title }}</span>
            </router-link>
        </div>
        <div class="nav-small-menu">
            <a class="nav-item" title="Open Menu" href="javascript:openSidebar()">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 7h16v2H0V7zm0-6h16v2H0V1zm0 12h16v2H0v-2z" fill-rule="evenodd"></path></svg>
            </a>
        </div>

        <div class="nav-group nav-large-menu">
          <span class="nav-item text-capitalize" v-if="status.length > 0 || message.length > 0"><code>{{ status }}{{ message }}</code></span>

          <router-link class="button dropdown margin" to="/">Username &#9662;
            <div class="dropdown-body nav-list border">
              <div class="margin-none padding full-width text-center">
                Welcome, <span class="text-bold">{{ access.username }}</span>
                <span class="text-lowercase">{{ access.url }}</span>
              </div>

              <router-link to="/profile" class="nav-item">My Profile</router-link>
              <router-link to="/settings" class="nav-item">Settings</router-link>
              <router-link class="nav-item button full-width" to="/logout">Logout</router-link>
            </div>
          </router-link>

          <button class="button margin-left" v-on:click="sync" :disabled="flag">Sync Now</button>
        </div>
    	</div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'app-navbar',
  data () {
    return {
      title: 'Dashboard',
      username: 'username',
      message: '',
      flag: false
    }
  },
  computed: mapGetters({
    access: 'getAccess',
    status: 'getSyncError',
    time: 'getSyncTime'
  }),
  created () {
    if (this.time !== null) {
      this.message = 'Synced ' + moment(this.time).fromNow()
    }
  },
  methods: {
    sync () {
      this.flag = true
      this.message = 'Syncing...'
      this.$store.dispatch('synchronize').then(result => {
        // on successful sync

        console.log('Syncrhonized at ' + moment(this.time).format())
        this.message = 'Synced ' + moment(this.time).fromNow()
        // delay for a second
        setTimeout(() => {
          this.flag = false
        }, 10)
      }).catch(err => {
        // failed login
        console.log(err)
        this.flag = false
      })
    },
    logoutNow () {
      console.log('logging out')
      this.$router.push('/logout')
      // this.$store.dispatch('setLoggedIn', false)
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
