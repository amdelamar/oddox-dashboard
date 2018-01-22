<template>
<div id="404" class="padding-top-large full-width full-height background-solid-lightgrey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large shadow border round background-solid-white animated fadeIn">
      <h4>{{title}}</h4>
      <div class="row">
        <p>Oops! The page you are looking for is not found or has been moved.</p>
      </div>
      <div class="row padding-top margin-top">
        <div class="six columns">
          <button class="button full-width" v-on:click="goBack">Go Back</button>
        </div>
        <div class="six columns">
          <button class="button button-blue full-width" v-on:click="returnToHome" autofocus>Open Dashboard</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'not-found',
  data () {
    return {
      title: '404 Not Found'
    }
  },
  methods: {
    returnToHome () {
      this.$router.push('/')
    },
    goBack () {
      this.$router.go(-1)
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
