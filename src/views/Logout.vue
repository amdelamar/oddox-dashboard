<template>
<div id="logout" class="padding-top-large full-width full-height background-solid-lightgrey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large shadow border round background-solid-white animated fadeIn">
      <h3>Goodbye!</h3>
      <div class="row">
        <p>You have been logged out.</p>
      </div>
      <div class="row padding-top margin-top">
        <button class="button button-blue full-width" v-on:click="returnToLogin" autofocus>Return to Login</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'logout',
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
