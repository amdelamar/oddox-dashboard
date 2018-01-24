<template>
<div id="not-found" class="padding-top-large full-width full-height background-solid-lightgrey">

  <div class="row section">
    <div class="four columns offset-by-four padding-large shadow border round background-solid-white animated bounce">
      <h3>{{title}}</h3>
      <div class="row">
        Oops! The page you are looking for is not found or has been moved.</p>
      </div>
      <div class="row padding-top margin-top">
        <div class="six columns">
          <button class="button full-width" v-on:click="goBack"><i class="icon-arrow-left2"></i>&nbsp;Go Back</button>
        </div>
        <div class="six columns">
          <button class="button button-blue full-width" v-on:click="returnToHome" autofocus><i class="icon-home"></i>&nbsp; Dashboard</button>
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
#not-found {
  margin: 0;
  align-content: center;
}
</style>
