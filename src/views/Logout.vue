<template>
<div id="logout" class="padding-top-large full-width full-height animated fadeIn">

  <div class="row">
    <div class="four columns offset-by-four padding-large border round">
      <h4>{{title}}</h4>
      <div class="row">
        <p>You have been logged out.</p>
      </div>
      <div class="row padding-top margin-top">
        <a class="button button-blue full-width" href="/#/login">Login back in</a>
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
  }
}
</script>

<style>
#logout {
  margin: 0;
  align-content: center;
}
</style>
