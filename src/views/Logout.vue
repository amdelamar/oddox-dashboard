<template>
<div id="logout" class="padding-top-large full-width full-height background-solid-grey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large border round background-solid-white animated fadeIn">
      <h4>{{title}}</h4>
      <div class="row">
        <p>You have been logged out.</p>
      </div>
      <div class="row padding-top margin-top">
        <button class="button button-blue full-width" v-on:click="returnToLogin" autofocus>Login back in</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
      title: 'Logout'
    }
  },
  methods: {
    returnToLogin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#logout {
  margin: 0;
  align-content: center;
}
</style>
