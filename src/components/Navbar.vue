<template>
  <nav id="app-navbar" class="navbar background-lightgrey">

      <div class="navbar-body padding-left padding-right">

        <div class="nav-item-logo">
            <a v-on:click="sync" :disabled="disableFlag">
              <img v-if="!iconSpin" class="background-darkgrey circle margin-left margin-right" src="static/img/icon-transparent-512.png" alt="Logo" />
              <img v-if="iconSpin" v-bind:class="{ 'animated rewind': iconSpin }" class="background-darkgrey circle margin-left margin-right" src="static/img/icon-transparent-512.png" alt="Logo" />
              <span class="text-medium text-thin text-uppercase text-wide">{{ title | shorten(15) }}</span>
            </a>
        </div>
        <div class="nav-small-menu margin-right">
            <a class="nav-item" title="Open Menu" href="javascript:openSidebar()">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 7h16v2H0V7zm0-6h16v2H0V1zm0 12h16v2H0v-2z" fill-rule="evenodd"></path></svg>
            </a>
        </div>

        <div class="nav-group nav-large-menu">
          <span class="nav-item text-capitalize"
            v-if="(syncError !== null && syncError.message !== undefined && syncError.message.length > 0) || syncTime.length > 0">
            <code>{{ moment(this.syncTime).format() }}{{ syncError.message }}</code>
          </span>

          <button class="button border-none hover-shadow-outline" v-on:click="sync" :disabled="disableFlag"><i v-if="!iconSpin" class="icon-loop2"></i><i v-if="iconSpin" v-bind:class="{ 'animated spin': iconSpin }" class="icon-spinner8"></i>&nbsp;{{ syncButton }}</button>

          <a href="javascript: void(0)" class="button border-none dropdown hover-shadow-outline margin-left"><i class="icon-user"></i>&nbsp;&#9662;
            <div class="dropdown-body round border nav-list shadow">
              <div class="margin-none padding full-width text-center text-darkgrey">
                Welcome <span class="text-bold" title="This is your username">{{ authToken.username }}</span><br/>
                <small title="This is your role">
                  <code>{{ authToken.serverAdmin ? 'Admin' : 'Author' }}</code><i class="icon-question"></i>
                </small>
              </div>

              <router-link :to="{name:'my-profile'}" class="nav-item"><i class="icon-profile"></i>&nbsp;My Profile</router-link>
              <router-link :to="{name:'settings'}" class="nav-item"><i class="icon-cog"></i>&nbsp;Settings</router-link>
              <hr class="margin"/>
              <button class="nav-item button button-danger full-width" v-on:click="logout">Logout</button>
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
      syncButton: 'Sync Now',
      iconSpin: false,
      disableFlag: false
    }
  },
  computed: mapGetters({
    isInitialized: 'isInitialized',
    appConfig: 'getAppConfig',
    authToken: 'getAuthToken',
    syncError: 'getSyncError',
    syncTime: 'getSyncTime'
  }),
  created () {
    if (!this.isInitialized) {
      // just a double check
      this.$store.dispatch('initialize')
    }
    if (this.appConfig !== null && this.appConfig.settings.name !== null) {
      // replace 'Dashboard' with blog name
      this.title = this.appConfig.settings.name
    }
  },
  methods: {
    sync () {
      console.log('Syncing...')
      this.syncButton = 'Syncing...'
      this.disableFlag = true
      this.iconSpin = true
      this.$store.dispatch('synchronize').then(result => {
        // on successful sync
        console.log('Synchronized at ' + moment(this.syncTime).format())
        this.syncButton = 'Synced'
        this.iconSpin = false
        this.$store.dispatch('loadAppConfig')
        this.$store.dispatch('searchPosts')
        this.$store.dispatch('searchAllAuthors')

        // delay for a second
        setTimeout(() => {
          this.disableFlag = false
          this.syncButton = 'Sync Now'
        }, 5000)
      }).catch(err => {
        // failed login
        console.log('Sync Failed: ' + err)
        this.disableFlag = false
        this.iconSpin = false
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
#app-navbar.navbar {
  position: relative;
  display: block;
}
#app-navbar .nav-item-logo {
  /* filter: grayscale(100%); */
  opacity: 0.8;
  transition: all 0.5s ease;
}
#app-navbar .nav-item-logo a {
  text-decoration: none;
  cursor: pointer;
}
#app-navbar .nav-item-logo:hover, #app-navbar .nav-item-logo:focus {
  /* filter: grayscale(0%); */
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
.greyscale {
  filter: grayscale(100%);
  transition: all 0.3s ease;
}
</style>
