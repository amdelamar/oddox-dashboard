<template>
  <div id="my-profile">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height border-right">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns border-top full-height">
      <div class="padding padding-left-large full-height full-width scrollable">
        <h1>My Profile</h1>
        <p>Change your profile settings. Click 'save' when finished.</p>
        <hr/>

        <div v-if="author !== null" class="row padding-left">
          <div class="six columns">
            <div class="row">
              <div class="two columns">
                <img v-if="author.thumbnail.length > 0" class="shadow round" height="65" width="65" alt="" :src="author.thumbnail" />
              </div>
              <div class="ten columns">
                <label for="thumbnail">Profile Picture</label>
                <input type="text" id="thumbnail" class="full-width" v-model="author.thumbnail" />
              </div>
            </div>
            <div class="row padding-top">
              <label for="name">Display Name</label>
              <input type="text" id="name" class="full-width" v-model="author.name" />
            </div>
            <div class="row padding-top">
              <label for="email">Email Address</label>
              <input type="text" id="email" class="full-width" v-model="author.email" />
            </div>
            <div class="row padding-top">
              <div class="six columns">
                <label for="username">Username</label>
                <input type="text" id="username" class="full-width" v-model="author._id" />
              </div>
              <div class="six columns">
                <label for="role">Role</label>
                <select id="role" class="full-width" v-model="author.roleId">
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                  <option value="author">Author</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>
            <div class="row padding-top">
              <p>
                Created: {{ author.createDate }}<br/>
                Modified: {{ author.modifyDate }}
              </p>
            </div>
            <div class="row padding-top padding-bottom text-right">
              <button class="button" v-on:click="editBio"><i class="icon-quill"></i>&nbsp;Edit Biography</button>
              <button class="button button-green" v-on:click="saveChanges"><i class="icon-checkmark"></i>&nbsp;Save Changes</button>
            </div>
          </div>
        </div>



        <hr/>
        <h3>Danger Zone</h3>
        <p>Careful! These actions may permanently destroy data.</p>

        <div class="button button-red dropdown"><i class="icon-cross"></i>&nbsp;Delete Account
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
  name: 'my-profile',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar
  },
  computed: mapGetters({
    authToken: 'getAuthToken',
    author: 'getCurrentAuthor'
  }),
  created () {
    this.getProfile()
  },
  methods: {
    getProfile () {
      this.$store.dispatch('setCurrentAuthor', this.authToken.username)
    },
    close () {
      this.$router.push('/post')
    },
    editBio () {
      this.$router.push('/edit-author/' + this.author._id)
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
</style>
