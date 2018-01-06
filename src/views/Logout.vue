<template>
<div id="logout">
    <h1>{{ msg }}</h1>
    <p>
        You have been logged out.
    </p>
    <p class="w3-center">
        <button class="w3-btn-wide w3-round w3-blue w3-hover-indigo"
            type="submit" value="Login" title="Login">Login back in</button>
    </p>
</div>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
      msg: 'Logout'
    }
  }
}
</script>

<style>
</style>
