<template>
  <div id="home">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section id="side-content" class="three columns full-height">
      <app-side-content></app-side-content>
    </section>
    <section id="main-content" class="seven columns full-height">
      <app-main-content></app-main-content>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import SideContent from '@/components/SideContent'

export default {
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'app-main-content': MainContent,
    'app-side-content': SideContent
  },
  computed: mapGetters({
    loggedIn: 'isAuthenticated'
  }),
  created () {
    if (!this.loggedIn) {
      console.log('User is not logged in. Redirecting to login page.')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#home {
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
