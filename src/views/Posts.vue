<template>
  <div id="posts">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section id="side-content" class="three columns full-height">
      <post-list-content></post-list-content>
    </section>
    <section id="main-content" class="seven columns full-height">
      <post-view-content></post-view-content>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ViewContent from '@/components/posts/ViewContent'
import ListContent from '@/components/posts/ListContent'

export default {
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'post-list-content': ListContent,
    'post-view-content': ViewContent
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated'
  }),
  created () {
    if (!this.isAuthenticated) {
      console.log('User is not logged in. Redirecting to login page.')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#posts {
  height: 100%;
  width: 100%;
}
#main {
  height: calc(100% - 6.5rem);
  width: 100%;
}
#side-content {
  width: 26%;
  margin: 0;
}
#main-content {
  width: 60.6666666667%;
  margin: 0;
}
.contextbar {
  min-height: 6.5rem;
  width: 100%;
}
</style>
