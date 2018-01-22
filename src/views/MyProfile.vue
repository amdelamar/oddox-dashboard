<template>
  <div id="my-profile">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height border-right">
      <app-sidebar></app-sidebar>
    </section>
    <section id="my-profile-content" class="ten columns border-top full-height">
      <div class="padding padding-left-large full-height full-width scrollable">
        <h1>My Profile</h1>
        <p>Change your profile settings. Click 'save' when finished.</p>
        <hr/>

        <div class="row padding-left">
          <div class="six columns">
            <div class="row">
              <div class="two columns">
                <img v-if="author.thumbnail.length > 0" class="shadow round" height="65" width="65" alt="" :src="author.thumbnail" />
              </div>
              <div class="ten columns">
                <label for="pp1" class="">Profile Picture</label>
                <input type="text" id="pp1" class="full-width" v-model="author.thumbnail" />
              </div>
            </div>
            <div class="row padding-top">
              <label for="f1" class="">Full Name</label>
              <input type="text" id="f1" class="full-width" v-model="author.name" />
            </div>
            <div class="row padding-top">
              <label for="e1" class="">Email Address</label>
              <input type="text" id="e1" class="full-width" v-model="author.email" />
            </div>
            <div class="row padding-top">
              <div class="six columns">
                <label for="u1" class="">Username</label>
                <input type="text" id="u1" class="full-width" v-model="author._id" />
              </div>
              <div class="six columns">
                <label for="r1" class="">Role</label>
                <select id="r1" class="full-width" v-model="author.roleId">
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            <div class="row padding-top">
              <label for="t1" class="">Quick Bio</label>
              <textarea id="t1" class="full-width" placeholder="A short description about me...">{{ author.description }}</textarea>
            </div>
            <div class="row padding-top">
              <p>
                Created: {{ author.createDate }}<br/>
                Modified: {{ author.modifyDate }}
              </p>
            </div>

          </div>
          <div class="twelve columns">
            <br/>
            <button class="button button-green" v-on:click="saveChanges">Save Changes</button>
            <button class="button" v-on:click="close">Cancel</button>
          </div>
        </div>


        <hr/>
        <h2>Danger Zone</h2>
        <p>Careful! These actions may permanently destroy data.</p>

        <div class="button button-red dropdown">Delete Account
          <div class="dropdown-body padding-none">
            <button class="button button-red" v-on:click="deleteAccount">Are you sure?</button>
          </div>
        </div>

        <br/><br/><br/>

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
    isAuthenticated: 'isAuthenticated',
    authToken: 'getAuthToken',
    author: 'getCurrentAuthor'
  }),
  created () {
    if (!this.isAuthenticated) {
      console.log('User is not logged in. Redirecting to login page.')
      this.$router.push('/login')
    }
    this.getProfile()
  },
  methods: {
    getProfile () {
      this.$store.dispatch('setCurrentAuthor', this.authToken.username)
    },
    close () {
      this.$router.push('/post')
    },
    saveChanges () {
      console.log('Saved Changes.')
    },
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
#my-profile {
  height: 100%;
  width: 100%;
}
#main {
  height: calc(100% - 6.5rem);
  width: 100%;
}
#my-profile-content {
  width: 86.6666666667%;
  margin: 0;
}
.contextbar {
  min-height: 6.5rem;
  width: 100%;
}
</style>
