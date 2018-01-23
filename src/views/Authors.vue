<template>
  <div id="authors">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="side-content columns full-height">
      <author-list-content></author-list-content>
    </section>
    <section class="main-content columns full-height">
      <author-view-content></author-view-content>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ViewContent from '@/components/authors/ViewContent'
import ListContent from '@/components/authors/ListContent'

export default {
  name: 'authors',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'author-list-content': ListContent,
    'author-view-content': ViewContent
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
#authors {
  height: 100%;
  width: 100%;
}
</style>
