<template>
<div id="login" class="padding-top-large full-width full-height background-solid-grey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large border round background-solid-white text-center">
      <h4>{{ title }}</h4>
      <div class="row">
        <input class="full-width" placeholder="Database URL" v-model="url" type="text" required autocapitalize="off" autocorrect="off" autocomplete="off" />
        <input class="full-width margin-top" placeholder="Username" v-model="username" type="text" required autofocus autocapitalize="off" autocorrect="off" />
        <input class="full-width margin-top" placeholder="Password" v-model="password" type="password" required />
      </div>
      <div class="row padding-top padding-bottom border-bottom text-center"></div>
      <div class="row padding-top margin-top">
        <input type="submit" class="button button-blue full-width" v-on:click="login" value="Login" />
      </div>
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
      password: ''
    }
  },
  methods: {
    login () {
      console.log('login submit')
      this.$router.push('/')
    }
  }
}
</script>

<style>
</style>
