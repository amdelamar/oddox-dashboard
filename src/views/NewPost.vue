<template>
  <div id="new-post">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns full-height">
      <post-edit-content></post-edit-content>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import EditContent from '@/components/posts/EditContent'
import ListContent from '@/components/posts/ListContent'

export default {
  name: 'new-post',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'post-list-content': ListContent,
    'post-edit-content': EditContent
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
#new-post {
  height: 100%;
  width: 100%;
}
</style>
