<template>
  <nav id="app-navbar" class="navbar background-solid-lightgrey">
      <div class="navbar-body padding-left padding-right">

        <div class="nav-item-logo">
            <router-link to="/">
              <img class="margin-left margin-right" src="static/img/icon-circle-light-512.png" alt="Logo" />
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

          <button class="button border-none hover-shadow hover-background-solid-white" v-on:click="sync" :disabled="flag"><i v-if="!flag" class="icon-loop2"></i><i v-if="flag" v-bind:class="{ 'text-medium animated spin': flag }" class="icon-spinner2"></i>&nbsp;{{ syncButton }}</button>

          <a href="javascript: void(0)" class="button dropdown border-none hover-shadow hover-background-solid-white margin"><i class="icon-user"></i>&nbsp;&#9662;
            <div class="dropdown-body round shadow nav-list">
              <div class="margin-none padding full-width text-center text-darkgrey">
                Welcome <span class="text-bold">{{ authToken.username }}</span>
              </div>

              <router-link to="/my-profile" class="nav-item"><i class="icon-profile"></i>&nbsp;My Profile</router-link>
              <router-link to="/settings" class="nav-item"><i class="icon-cog"></i>&nbsp;Settings</router-link>
              <hr class="margin"/>
              <button class="nav-item button button-red full-width" v-on:click="logout">Logout</button>
            </div>
          </a>

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
        this.syncButton = 'Synced'
        // delay for a second
        setTimeout(() => {
          this.flag = false
          this.$store.dispatch('allPosts')
          this.$store.dispatch('allAuthors')
          this.$store.dispatch('loadAppConfig')
          this.$store.dispatch('loadAppFirewall')
          this.syncButton = 'Sync Now'
        }, 2000)
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
#app-navbar .nav-item-logo {
  filter: grayscale(100%);
  opacity: 0.8;
  transition: all 0.5s ease;
}
#app-navbar .nav-item-logo:hover, #app-navbar .nav-item-logo:focus {
  filter: grayscale(0%);
  opacity: 1;
}
#app-navbar .dropdown-body {
  min-width: 21rem;
  left: -15.6rem;
}
#app-navbar .router-link-active, #app-navbar .router-link-exact-active {
  text-decoration: none;
}
#app-navbar .router-link-active:hover, #app-navbar .router-link-exact-active:hover {
  text-decoration: none;
}
</style>
