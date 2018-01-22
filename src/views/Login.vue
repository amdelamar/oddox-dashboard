<template>
<div id="login" class="padding-top-large full-width full-height background-solid-grey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large border round background-solid-white">
      <h4 class="text-center">{{ title }}</h4>
      <form v-on:submit="login">
      <div class="row">
        <input class="full-width" placeholder="Database URL" v-model="authToken.url" type="text" required autocapitalize="off" autocorrect="off" autocomplete="off" />
        <input class="full-width margin-top" placeholder="Username" v-model="authToken.username" type="text" required autofocus autocapitalize="off" autocorrect="off" />
        <input class="full-width margin-top" placeholder="Password" v-model="authToken.password" type="password" required />

        <small class="red animated jello">{{status}}</small>
      </div>
      <div class="row padding-top padding-bottom border-bottom text-center"></div>
      <div class="row padding-top margin-top">
        <input type="submit" class="button button-blue full-width" v-on:submit="login" :disabled="flag" value="Login" />
      </div>
      </form>
    </div>
    <div class="twelve columns">
      <p class="text-center">
        <a href="/#/forgot?type=username">Forgot Username?</a>&nbsp;|&nbsp;
        <a href="/#/forgot?type=password">Forgot Password?</a>
      </p>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      title: 'Login',
      authToken: {
        url: 'https://localhost:6984/',
        username: 'admin',
        password: ''
      },
      flag: false,
      message: null
    }
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated',
    status: 'getAuthError'
  }),
  created () {
    if (this.isAuthenticated) {
      console.log('User is already logged in. Redirecting to home page.')
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      this.flag = true
      this.$store.dispatch('setAuthError', '')
      let errFlag = false

      this.authToken.url = this.authToken.url.toLowerCase()
      this.authToken.username = this.authToken.username.toLowerCase()

      if (this.authToken.url.length <= 10) {
        errFlag = true
        this.message = 'Your blog\'s CouchDB address. (E.g. https://127.0.0.1:6984/)'
      }
      if (this.authToken.username.length <= 0) {
        errFlag = true
        this.message = 'Username is empty.'
      }
      if (this.authToken.password.length <= 0) {
        errFlag = true
        this.message = 'Password is empty.'
      }
      if (!errFlag) {
        this.$store.dispatch('login', this.authToken).then(result => {
          // on successful login
          console.log(result)
          // delay for a second
          setTimeout(() => {
            this.flag = false
            this.$router.push('/')
          }, 10)
        }).catch(err => {
          // failed login
          console.log(err)
          this.authToken.password = ''
          this.flag = false
        })
      }
    }
  }
}
</script>

<style>
.red {
  color: red;
}
</style>
