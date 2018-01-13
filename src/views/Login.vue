<template>
<div id="login" class="padding-top-large full-width full-height background-solid-grey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large border round background-solid-white">
      <h4 class="text-center">{{ title }}</h4>
      <form v-on:submit="login">
      <div class="row">
        <input class="full-width" placeholder="Database URL" v-model="url" type="text" required autocapitalize="off" autocorrect="off" autocomplete="off" />
        <input class="full-width margin-top" placeholder="Username" v-model="username" type="text" required autofocus autocapitalize="off" autocorrect="off" />
        <input class="full-width margin-top" placeholder="Password" v-model="password" type="password" required />

        <small v-if="message !== null" class="red animated jello">{{message}}</small>
      </div>
      <div class="row padding-top padding-bottom border-bottom text-center"></div>
      <div class="row padding-top margin-top">
        <input type="submit" class="button button-blue full-width" v-on:submit="login" value="Login" />
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
export default {
  name: 'login',
  data () {
    return {
      title: 'Login',
      url: 'https://localhost:6984/',
      username: '',
      password: '',
      message: null
    }
  },
  methods: {
    login () {
      this.message = null
      let errFlag = false

      if (this.url.length <= 0) {
        errFlag = true
        this.message = 'Your blog\'s CouchDB address. (E.g. https://127.0.0.1:6984/)'
      }
      if (this.username.toLowerCase() !== 'admin' ||
        this.password.toLowerCase() !== 'admin') {
        errFlag = true
        this.message = 'Invalid username or password.'
      }
      if (!errFlag) {
        this.$router.push('/')
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
