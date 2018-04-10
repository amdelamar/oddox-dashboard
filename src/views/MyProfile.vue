<template>
  <div id="my-profile">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height border-right border-tertiary">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns border-top border-tertiary full-height">
      <div class="padding padding-left-large full-height full-width background-white scrollable">

        <p class="super-center text-center text-darkgrey animated fadeIn" v-if="loading && message.length == 0">
          <i class="icon-spinner9 animated spin"></i><br/>
          <em>Loading...</em>
        </p>
        <p class="super-center text-center animated fadeIn" v-if="message.length > 0">
          <i class="icon-notification text-danger text-largest"></i><br/>
          <em class="text-danger text-bold">{{ message }}</em>
        </p>

      </div>
    </section>
  </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'my-profile',
  data () {
    return {
      loading: true,
      message: ''
    }
  },
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  computed: mapGetters({
    authToken: 'getAuthToken'
  }),
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      this.$store.dispatch('setCurrentAuthor', this.authToken.username).then(result => {
        this.loading = false
        this.$router.push('/edit-author/' + this.authToken.username)
      }).catch(err => {
        // failed logout
        console.log(err)
        this.message = err
      })
    }
  }
}
</script>

<style>
#my-profile {
  height: 100%;
  width: 100%;
}
</style>
