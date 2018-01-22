<template>
  <nav id="app-sidebar" class="background-solid-grey">

    <div class="full-width">
      <div class="contextbar padding">
        <button class="full-width button button-blue" v-on:click="newpost">New Post</button>
      </div>

      <div class="nav-list padding padding-bottom-large">
        <router-link class="nav-item round hover-shadow" to="/">Posts</router-link>
        <router-link class="nav-item round hover-shadow" to="/draft">Drafts</router-link>
        <router-link class="nav-item round hover-shadow" to="/featured">Featured</router-link>
        <router-link class="nav-item round hover-shadow" to="/category">By Category</router-link>
        <router-link class="nav-item round hover-shadow" to="/tags">By Tags</router-link>
        <router-link class="nav-item round hover-shadow" to="/years">By Year</router-link>
        <router-link class="nav-item round hover-shadow" to="/trash">Trash</router-link>
        <router-link class="nav-item round hover-shadow" to="/">All Posts</router-link>
          <span class="nav-item border-bottom"></span>
          <router-link class="nav-item round hover-shadow" to="/author">All Authors</router-link>
        <router-link class="nav-item round hover-shadow" to="/profile">My Profile</router-link>
        <router-link class="nav-item round hover-shadow" to="/settings">Settings</router-link>
          <span class="nav-item border-bottom"></span>
      </div>
    </div>

    <footer class="padding margin full-width text-center">
      <p title="Total disk size of your database">
        Storage: <code>{{ dbsize }}</code>
      </p>
      <span class="text-small border-top padding-top">
        <em><a :href="link">{{ name }} {{ version }}</a></em>
      </span>
    </footer>
  </nav>
</template>

<script>
export default {
  name: 'app-sidebar',
  data () {
    return {
      name: 'Oddox',
      link: 'https://oddox.org/',
      version: 'v1.0.0',
      dbsize: '15 MB'
    }
  },
  methods: {
    newpost () {
      console.log('new post')
    }
  }
}
</script>

<style>
#app-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
#app-sidebar a {
  color: initial;
}
#app-sidebar footer, #app-sidebar footer a {
  color: grey;
}
#app-sidebar footer:hover, #app-sidebar footer a:hover {
  color: initial;
}
</style>
