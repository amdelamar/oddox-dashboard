<template>
  <nav id="app-sidebar" class="border-right background-solid-grey">

    <div class="contextbar row padding">
      <button class="full-width button button-blue" v-on:click="newpost">New Post</button>
    </div>

    <div class="nav-list padding padding-bottom-large">
        <a class="nav-item" href="/#/posts">Posts</a>
        <a class="nav-item" href="/#/drafts">Drafts</a>
        <a class="nav-item" href="/#/featured">Featured</a>
        <a class="nav-item" href="/#/category">By Category</a>
        <a class="nav-item" href="/#/tags">By Tags</a>
        <a class="nav-item" href="/#/years">By Year</a>
        <a class="nav-item" href="/#/trash">Trash</a>
        <a class="nav-item" href="/#/all-posts">All Posts</a>
        <span class="nav-item border-bottom"></span>
        <a class="nav-item" href="/#/settings">Settings</a>
        <span class="nav-item border-bottom"></span>
    </div>

    <div id="footer" class="padding full-width text-center">
        <p title="Total disk size of your database">
          Storage: <code>{{ dbsize }}</code>
        </p>
        <span class="text-small border-top padding-top">
          <em><a :href="link">{{ name }} {{ version }}</a></em>
        </span>
    </div>
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
  max-width: 100%;
}
#app-sidebar a {
  color: initial;
}
#footer, #footer a {
  color: grey;
}
#footer:hover, #footer a:hover {
  color: initial;
}
#footer {
  left: 0;
  bottom: 0;
  margin: auto;
}
</style>
