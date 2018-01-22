<template>
  <div id="profile">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section id="settings-content" class="ten columns full-height">
      <div class="padding full-height full-width scrollable">
        <h1>My Profile</h1>
        <p>Change your profile settings. Click 'save' when finished.</p>
        <hr/>

        <div class="nine columns">
        <div class="row">
          <label for="in8" class="">Full Name</label>
          <input type="text" id="in8" class="full-width" value="" />
        </div>
        <div class="row padding-top">
          <label for="in8" class="">Username</label>
          <input type="text" id="in8" class="full-width" value="" />
        </div>
        <div class="row padding-top">
          <label for="t1" class="">Quick Bio</label>
          <textarea id="t1" class="full-width" placeholder="Hello..."></textarea>
        </div>
        </div>

        <div class="twelve columns">
        <hr/>
        <h2>Danger Zone</h2>
        <p>Careful! These settings may permanently destroy data.</p>

        <div class="button button-red dropdown">Delete Account
          <div class="dropdown-body padding-none">
            <button class="button button-red" v-on:click="deleteAccount">Are you sure?</button>
          </div>
        </div>

        <br/><br/><br/>
        </div>

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
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  computed: mapGetters({
    isAuthenticated: 'isAuthenticated'
  }),
  created () {
    if (!this.isAuthenticated) {
      console.log('User is not logged in. Redirecting to login page.')
      this.$router.push('/login')
    }
  },
  methods: {
    deleteAccount () {
      if (confirm('Are you sure you want to delete your acount?\nYou cannot undo this.')) {
        console.log('Deleted Account.')
        console.log('logging out')
        this.$store.dispatch('logout').then(result => {
          // on successful logout
          // delay for a second
          setTimeout(() => {
            this.$router.push('/logout')
          }, 10)
        }).catch(err => {
          // failed logout
          console.log(err)
        })
      }
    }
  }
}
</script>

<style>
#profile {
  height: 100%;
  width: 100%;
}
#main {
  height: calc(100% - 6.5rem);
  width: 100%;
}
.contextbar {
  min-height: 6.5rem;
  width: 100%;
}
</style>
