<template>
<div id="unauthorized" class="background-solid-lightgrey">

  <app-logobar></app-logobar>

  <div class="row section padding-top-large">
    <div id="error-dialog" class="padding-large shadow border round background-solid-white animated shake">
      <h3>401 Unauthorized</h3>
      <div class="row">
        Oops! The page you are looking for is for Server Admins only.</p>
      </div>
      <div class="row padding-top">
        <div class="six columns margin-top">
          <button class="button full-width" v-on:click="goBack"><i class="icon-arrow-left2"></i>&nbsp;Go Back</button>
        </div>
        <div class="six columns margin-top">
          <button class="button button-blue full-width" v-on:click="returnToHome" autofocus><i class="icon-home"></i>&nbsp; Dashboard</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Logobar from '@/components/Logobar'
export default {
  components: {
    'app-logobar': Logobar
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
#unauthorized {
  height: 100%;
  width: 100%;
  margin: 0;
  align-content: center;
}
#error-dialog {
  min-width: 25rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
