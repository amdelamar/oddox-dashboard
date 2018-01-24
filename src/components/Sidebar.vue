<template>
  <nav id="app-sidebar" class="background-solid-lightgrey">

    <div class="full-width">
      <div class="contextbar padding">
        <button class="full-width button button-blue" v-on:click="newpost">New Post</button>
      </div>

      <nav class="nav-list padding padding-bottom-large">
        <router-link class="nav-item" to="/post"><i class="icon-drawer2"></i>&nbsp;Posts</router-link>
        <router-link class="nav-item" to="/draft"><i class="icon-file-text2"></i>&nbsp;Drafts</router-link>
        <router-link class="nav-item" to="/featured"><i class="icon-star-empty"></i>&nbsp;Featured</router-link>
        <router-link class="nav-item" to="/category"><i class="icon-folder"></i>&nbsp;Categories</router-link>
        <router-link class="nav-item" to="/tags"><i class="icon-price-tag"></i>&nbsp;Tags</router-link>
        <router-link class="nav-item" to="/years"><i class="icon-calendar"></i>&nbsp;Years</router-link>
        <router-link class="nav-item" to="/trash"><i class="icon-bin"></i>&nbsp;Trash</router-link>
        <router-link class="nav-item" to="/all"><i class="icon-book"></i>&nbsp;All Posts</router-link>
          <span class="nav-item border-bottom"></span>
        <router-link class="nav-item" to="/author"><i class="icon-users"></i>&nbsp;All Authors</router-link>
        <router-link class="nav-item" to="/my-profile"><i class="icon-profile"></i>&nbsp;My Profile</router-link>
        <router-link class="nav-item" to="/settings"><i class="icon-cog"></i>&nbsp;Settings</router-link>
          <span class="nav-item border-bottom"></span>
      </nav>
    </div>

    <footer class="padding margin full-width text-darkgrey text-center">
      <p title="Total disk size of your database">
        Storage: <code>{{ dbsize }}</code>
      </p>
      <span class="text-small border-top padding-top">
        <em><a class="text-darkgrey" :href="link">{{ name }} {{ version }}</a></em>
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
      console.log('New Post')
      this.$store.dispatch('setCurrentPost', null)
      this.$router.push('/new-post')
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
#app-sidebar nav a, #app-sidebar nav a:visited {
  color: initial;
}
#app-sidebar nav a:hover {
  color: var(--blue);
  text-decoration: none;
}
#app-sidebar footer a:hover {
  color: var(--blue);
}
#app-sidebar .router-link-active, #app-sidebar .router-link-exact-active {
  font-weight: 700;
  color: var(--blue) !important;
}
#app-sidebar .router-link-active:hover, #app-sidebar .router-link-exact-active:hover {
  font-weight: 700;
  color: var(--light-blue) !important;
}
</style>
