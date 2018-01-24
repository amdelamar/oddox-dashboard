<template>
  <nav id="app-navbar" class="navbar background-solid-lightgrey">
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
          <span class="nav-item text-capitalize" v-if="status.length > 0 || message.length > 0"><code>{{ message }}{{ status }}</code></span>

          <a href="javascript: void(0)" class="button dropdown margin"><i class="icon-user"></i>&nbsp;{{ authToken.username }} &#9662;
            <div class="dropdown-body nav-list border">
              <div class="margin-none padding full-width text-center text-darkgrey">
                Welcome <span class="text-bold">{{ authToken.username }}</span>
              </div>

              <router-link to="/my-profile" class="nav-item"><i class="icon-profile"></i>&nbsp;My Profile</router-link>
              <router-link to="/settings" class="nav-item"><i class="icon-cog"></i>&nbsp;Settings</router-link>
              <a class="nav-item button full-width" v-on:click="logout">Logout</a>
            </div>
          </a>

          <button class="button button-green button-green-outline margin-left" v-on:click="sync" :disabled="flag"><i class="icon-loop2"></i>&nbsp;{{ syncButton }}</button>
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
      message: '',
      syncButton: 'Sync Now',
      flag: false
    }
  },
  computed: mapGetters({
    authToken: 'getAuthToken',
    status: 'getSyncError',
    syncTime: 'getSyncTime'
  }),
  created () {
    if (this.syncTime !== null) {
      this.message = 'Synced ' + moment(this.syncTime).fromNow()
    }
  },
  methods: {
    sync () {
      console.log('Syncing...')
      this.message = ''
      this.syncButton = 'Syncing...'
      this.flag = true
      this.$store.dispatch('synchronize').then(result => {
        // on successful sync
        console.log('Syncrhonized at ' + moment(this.syncTime).format())
        this.message = 'Synced ' + moment(this.syncTime).fromNow()
        this.syncButton = 'Sync Now'
        // delay for a second
        setTimeout(() => {
          this.flag = false
          this.$store.dispatch('allPosts')
          this.$store.dispatch('allAuthors')
        }, 10)
      }).catch(err => {
        // failed login
        console.log(err)
        this.flag = false
        this.syncButton = 'Sync Now'
      })
    },
    logout () {
      if (confirm('Are you sure you want to logout?\nYou\'ll need an internet connection to log back in.')) {
        console.log('Logging out...')
        this.$store.dispatch('logout').then(result => {
          // on successful logout
          console.log('Logged out.')
          // delay for a second
          setTimeout(() => {
            this.$router.push('/logout')
          }, 10)
        }).catch(err => {
          // failed logout
          console.log(err)
        })
      }
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
#app-navbar .router-link-active, #app-navbar .router-link-exact-active {
  text-decoration: none;
}
#app-navbar .router-link-active:hover, #app-navbar .router-link-exact-active:hover {
  text-decoration: none;
}
#app-navbar .nav-item-logo:hover {
  opacity: 0.75;
}
</style>
