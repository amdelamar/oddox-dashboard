<template>
<div id="login" class="background-lightgrey">

  <app-logobar></app-logobar>

  <div class="row section padding-top-large">
    <div id="login-dialog" class="padding-large shadow border round background-white animated fadeIn">
      <h3 class="text-center">Login</h3>

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
      <div class="row text-center" v-if="message.length > 1">
        <span class="text-danger text-bold animated fadeIn"><span class="icon-blocked"></span>&nbsp;{{message}}</span>
      </div>

      <div class="row">
        <input type="submit" class="button button-primary full-width margin-top" v-on:submit="login" :disabled="disableLogin" value="Login" />
      </div>
      <div class="row padding-top margin-top left">
        <input type="checkbox" id="c1" v-model="rememberMe" class="full-width" />
        <label for="c1" class="text-darkgrey">Remember Me</label>
      </div>
      </form>

    </div>
    <div class="twelve columns animated fadeInUp">
      <p class="text-center text-darkgrey">
        <a class="text-darkgrey" href="/#/forgot/username">Forgot Username?</a>&nbsp;/
        <a class="text-darkgrey" href="/#/forgot/password">Forgot Password?</a>
      </p>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logobar from '@/components/Logobar'
export default {
  name: 'login',
  components: {
    'app-logobar': Logobar
  },
  data () {
    return {
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
          console.log('Initializing databases...')
          this.$store.dispatch('initialize').then(result2 => {
            // successful initialize
            console.log(result2)
            this.disableLogin = false
            this.message = result
            this.$router.push('/post')
          }).catch(err2 => {
            // failed initialize
            console.log('Init Error: ' + err2)
            this.message = err2
            this.authToken.password = ''
            this.disableLogin = false

            // disappear after 5 seconds
            setTimeout(() => {
              this.message = ''
            }, 5000)
          })
        }).catch(err => {
          // failed login
          console.log('Login Error: ' + err)
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
#login {
  height: 100%;
  width: 100%;
  margin: 0;
  align-content: center;
}
#login i {
  vertical-align: middle;
  text-align: center;
  line-height: 1.6;
  font-size: 1em;
  margin-top: 1rem;
  padding-top: .8rem;
}
#login-dialog {
  min-width: 25rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
