<template>
  <nav id="app-sidebar" class="background-solid-lightgrey">

    <div class="full-width">
      <div class="contextbar padding">
        <button class="full-width button button-blue" v-on:click="newPost">New Post</button>
      </div>

      <nav class="nav-list padding">
        <router-link class="nav-item" :to="{name:'posts'}"><i class="icon-stack"></i>&nbsp;&nbsp;<span>Posts</span></router-link>
        <router-link class="nav-item" :to="{name:'drafts'}"><i class="icon-file-text2"></i>&nbsp;&nbsp;<span>Drafts</span></router-link>
        <router-link class="nav-item" :to="{name:'featured'}"><i class="icon-star-full"></i>&nbsp;&nbsp;<span>Featured</span></router-link>
        <router-link class="nav-item" :to="{name:'category'}"><i class="icon-folder"></i>&nbsp;&nbsp;<span>Categories</span></router-link>
        <router-link class="nav-item" :to="{name:'tags'}"><i class="icon-price-tag"></i>&nbsp;&nbsp;<span>Tags</span></router-link>
        <router-link class="nav-item" :to="{name:'years'}"><i class="icon-calendar"></i>&nbsp;&nbsp;<span>Years</span></router-link>
        <router-link class="nav-item" :to="{name:'trash'}"><i class="icon-bin"></i>&nbsp;&nbsp;<span>Trash</span></router-link>
        <router-link class="nav-item" :to="{name:'all-posts'}"><i class="icon-book"></i>&nbsp;&nbsp;<span>All Posts</span></router-link>
          <span class="nav-item"><hr class="margin-none"/></span>
        <router-link class="nav-item" :to="{name:'authors'}"><i class="icon-users"></i>&nbsp;&nbsp;<span>All Authors</span></router-link>
        <router-link class="nav-item" :to="{name:'settings'}"><i class="icon-cog"></i>&nbsp;&nbsp;<span>Settings</span></router-link>

      </nav>
    </div>

    <footer class="full-width text-darkgrey text-center">
      <p class="text-small text-nowrap" title="Total disk size of your database">
        Storage: <code>{{ dbsize }}</code><br/>
        <a class="text-darkgrey" :href="link">{{ name }} {{ version }}</a>
      </p>
    </footer>
  </nav>
</template>

<script>
export default {
  name: 'app-sidebar',
  data () {
    return {
      name: 'Oddox',
      link: 'https://oddox.org',
      version: 'v1.0.0',
      dbsize: '15 MB'
    }
  },
  methods: {
    newPost () {
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
@media (max-width:550px){
  #app-sidebar {
    height: auto;
  }
}
@media (min-width:550px) and (max-width:800px){
  #app-sidebar nav .nav-item span {
    display: none;
  }
  #app-sidebar footer span {
    display: none;
  }
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
