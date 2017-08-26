<template>
  <div id="app">
    <navbar></navbar>
    <main class="container">
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
    <footer>Footer</footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
