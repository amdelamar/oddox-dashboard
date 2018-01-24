<template>
<div id="login" class="padding-top-large full-width full-height background-solid-lightgrey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large shadow border round background-solid-white animated fadeIn">
      <h3 class="text-center">{{ title }}</h3>

      <form v-on:submit="login">
      <div class="row">
        <div class="one columns text-center">
          <i class="icon-database text-grey"></i>
        </div>
        <div class="ten columns">
          <input class="full-width" placeholder="Database URL" v-model="authToken.url" type="text" required autocapitalize="off" autocorrect="off" autocomplete="off" />
        </div>
      </div>
      <div class="row">
        <div class="one columns text-center">
          <i class="icon-user text-grey"></i>
        </div>
        <div class="ten columns">
          <input class="full-width" placeholder="Username" v-model="authToken.username" type="text" required autofocus autocapitalize="off" autocorrect="off" />
        </div>
      </div>
      <div class="row">
        <div class="one columns text-center">
          <i class="icon-key text-grey"></i>
        </div>
        <div class="ten columns">
          <input class="full-width" placeholder="Password" v-model="authToken.password" type="password" required />
        </div>
      </div>
      <div class="row text-center">
        <span class="text-red" v-bind:class="{ 'animated fadeIn': message.length > 1 }"><span v-if="message.length > 1" class="icon-blocked"></span>&nbsp;{{message}}</span>
      </div>

      <div class="row padding-top">
        <input type="submit" class="button button-blue full-width" v-on:submit="login" :disabled="disableLogin" value="Login" />
      </div>
      <div class="row padding-top margin-top left">
        <input type="checkbox" id="c1" v-model="rememberMe" class="full-width" />
        <label for="c1" class="text-darkgrey">Remember Me</label>
      </div>
      </form>

    </div>
    <div class="twelve columns animated fadeInUp">
      <p class="text-center">
        <a href="/#/forgot/username">Forgot Username?</a>&nbsp;|&nbsp;
        <a href="/#/forgot/password">Forgot Password?</a>
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
        username: '',
        password: ''
      },
      rememberMe: true,
      disableLogin: false,
      message: ''
    }
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated'
  }),
  created () {
    if (this.isAuthenticated) {
      console.log('User is already logged in. Redirecting to home page.')
      this.$router.push('/')
    }

    // recover url and username from localstorage
    let rememberMeToken = JSON.parse(localStorage.getItem('remember-me'))
    if (rememberMeToken !== null) {
      this.authToken.username = rememberMeToken.username
      this.authToken.url = rememberMeToken.url
    }
  },
  methods: {
    login () {
      this.disableLogin = true
      this.message = ''
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
        if (this.rememberMe) {
          // remember me
          let newRememberMeToken = {
            'username': this.authToken.username,
            'url': this.authToken.url
          }
          localStorage.setItem('remember-me', JSON.stringify(newRememberMeToken))
        } else {
          // or forget me
          localStorage.removeItem('remember-me')
        }

        this.$store.dispatch('login', this.authToken).then(result => {
          // successful login
          console.log(result)
          this.message = result
          this.disableLogin = false
          this.$router.push('/post')
        }).catch(err => {
          // failed login
          console.log(err)
          this.message = err
          this.authToken.password = ''
          this.disableLogin = false

          // disappear after 5 seconds
          setTimeout(() => {
            this.message = ''
          }, 5000)
        })
      }
    }
  }
}
</script>

<style>
.text-red {
  color: var(--red);
}
#login i {
  vertical-align: middle;
  text-align: center;
  line-height: 1.6;
  font-size: 1em;
  margin-top: 1rem;
  padding-top: .8rem;
}
</style>
