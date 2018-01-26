<template>
<div id="logout" class="background-solid-lightgrey">

  <app-logobar></app-logobar>

  <div class="row section padding-top-large ">
    <div id="logout-dialog" class="padding-large shadow border round background-solid-white animated fadeIn">
      <h3>Goodbye!</h3>
      <div class="row">
        <p>You have been logged out.</p>
      </div>
      <div class="row">
        <button class="button button-blue margin-top full-width" v-on:click="returnToLogin" autofocus>Return to Login</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Logobar from '@/components/Logobar'
export default {
  name: 'logout',
  components: {
    'app-logobar': Logobar
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
  height: 100%;
  width: 100%;
  margin: 0;
  align-content: center;
}
#logout-dialog {
  min-width: 25rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
