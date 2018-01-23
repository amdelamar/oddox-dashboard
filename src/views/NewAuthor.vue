<template>
  <div id="new-author">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns full-height">
      <author-edit-content></author-edit-content>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import EditContent from '@/components/authors/EditContent'
import ListContent from '@/components/authors/ListContent'

export default {
  name: 'new-author',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'author-list-content': ListContent,
    'author-edit-content': EditContent
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
#new-author {
  height: 100%;
  width: 100%;
}
</style>
