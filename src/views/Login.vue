<template>
<div id="login" class="padding-top-large full-height full-width">

  <form action="/#/" method="post" class="text-center">
    <div class="row">
      <div class="four columns offset-by-four padding-large border round">
        <h4>{{ title }}</h4>
        <div class="row">
          <input class="full-width" placeholder="Database URL" v-model="url" type="text" required autocapitalize="off" autocorrect="off" autocomplete="off" />
          <input class="full-width margin-top" placeholder="Username" v-model="username" type="text" required autofocus  />
          <input class="full-width margin-top" placeholder="Password" v-model="password" type="password" required />
        </div>
        <div class="row padding-top padding-bottom border-bottom text-center"></div>
        <div class="row padding-top margin-top">
          <a class="button button-blue full-width" href="/#/">Login</a>
        </div>
      </div>
    </div>
  </form>
  <p class="text-center text-small">
    <a href="/#/forgot?type=username">Forgot Username?</a>&nbsp;|&nbsp;
    <a href="/#/forgot?type=password">Forgot Password?</a>
  </p>
</div>
</template>

<script>
import router from '@/router'

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
    submit () {
      console.log('login submit')
      router.go('/')
    }
  }
}
</script>

<style>
</style>
