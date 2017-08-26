<template>
	<footer id="app-footer" class="navbar navbar-expand-md bg-light fixed-bottom">
      <small class="text-secondary text-sm">
		&#169; {{ copyright }} | {{ update }}
	  </small>
    </footer>
</template>

<script>
export default {
  name: 'app-footer',
  data () {
    return {
      copyright: 'RamblingWare 2014-2017',
      update: 'Last Updated: 8-26-2017'
    }
  }
}
</script>

<style>

</style>
