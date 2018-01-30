<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="four columns tabs">
      <button class="tab button" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)">Profile</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)">Account</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 2 }" v-on:click="setTab(2)">Advanced</button>
    </div>
    <div class="eight columns padding text-right" v-if="author !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;Save</button>
      <button class="button" v-on:click="close">Cancel</button>
    </div>
  </div>

  <div id="author-edit" class="border-left background-solid-white scrollable">

    <p class="super-center text-center text-darkgrey animated fadeIn" v-if="loading">
      <i class="icon-spinner9 animated spin"></i><br/>
      <em>Loading...</em>
    </p>
    <p class="super-center text-center animated fadeIn" v-if="author === null && status.length > 0">
      <i class="icon-notification text-red text-largest"></i><br/>
      <em class="text-red text-bold">{{ status }}</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="author !== null && !loading">

      <div v-if="tab == 0">
        <!-- Profile -->
        <div class="row">
          <label for="name">Display Name</label>
          <input type="text" id="name" style="width:50%;min-width:25rem;" v-model="author.name" placeholder="My Name" />
        </div>
        <div class="row padding-top">
          <label for="desc">Short Description</label>
          <textarea id="desc" class="full-width" placeholder="A short description about me..." v-model="author.description"></textarea>
        </div>
        <div class="row padding-top">
          <label for="cont">About Me / Long Description</label>
          <textarea id="cont" class="full-width" style="height:30rem;" v-model="author.content" placeholder="<p>\nA few paragraphs about me...\n</p>"></textarea>
        </div>
      </div>
      <div v-if="tab == 1">
        <!-- Account -->
        <h4>{{ author.name }}</h4>
        <div class="row">
          <img v-if="author.thumbnail.length > 0" class="round border margin-right left" height="65" width="65" alt="" :src="author.thumbnail" />
          <label for="thumbnail"><i class="icon-image"></i>&nbsp;Profile Picture</label>
          <input type="text" id="thumbnail" style="width:25rem;" v-if="author.thumbnail !== null" v-model="author.thumbnail" />
        </div>
        <div class="row padding-top">
          <div class="six columns">
            <label for="username"><i class="icon-user"></i>&nbsp;Username</label>
            <input type="text" id="username" class="" v-model="author._id" />
            <br/>
            <span class="text-darkgrey">https://{{ 'mydomain.com/author/' }}{{ author._id || ''}}</span>
          </div>
          <div class="six columns">
            <label for="role"><i class="icon-clipboard"></i>&nbsp;Role</label>
            <select id="role" class="" v-model="author.roleId">
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
              <option value="author">Author</option>
              <option value="editor">Editor</option>
            </select>
          </div>
        </div>
        <div class="row padding-top">
          <label for="email"><i class="icon-envelop"></i>&nbsp;Email Address</label>
          <input type="text" id="email" style="width:50%;min-width:25rem;" v-model="author.email" />
        </div>
        <hr/>
        <div class="row padding-top padding-bottom">
          <h3>Security</h3>
          <button class="button">Change Password</button>
          <button class="button">Reset Password</button>

          <br/><br/>
        </div>

      </div>
      <div v-if="tab == 2">
        <!-- Advanced -->
        <h4>{{ author.name }}</h4>
        <div class="row">
          <p>
            <i class="icon-clock"></i>&nbsp;Created: <code>{{ author.createDate || 'null' }}</code><br/>
            <i class="icon-clock"></i>&nbsp;Modified: <code>{{ author.modifyDate || 'null' }}</code><br/>
          </p>
        </div>
        <hr/>
        <div class="row padding-top padding-bottom">
          <h3>Danger Zone</h3>
          <p>Careful! These actions may permanently destroy data.</p>
          <button class="button button-red" v-on:click="destroy"><i class="icon-cross"></i>&nbsp;Delete</button>
        </div>
      </div>
    </div>

  </div>
</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'author-edit',
  data () {
    return {
      author: {},
      newFlag: false,
      tab: 0,
      status: '',
      loading: true,
      preview: false
    }
  },
  computed: mapGetters({
    currentAuthor: 'getCurrentAuthor'
  }),
  created () {
    this.read()
  },
  watch: {
    '$route': 'read'
  },
  methods: {
    read () {
      if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
        // edit author
        this.$store.dispatch('setCurrentAuthor', this.$route.params.id).then(() => {
          this.loading = false
          this.author = JSON.parse(JSON.stringify(this.currentAuthor))
        }).catch((err) => {
          this.loading = false
          this.status = err
        })
      } else {
        // new author
        this.$store.dispatch('setCurrentAuthor', null).then(() => {
          this.loading = false
          this.newFlag = true
          this.author = {
            _id: '',
            name: '',
            email: '',
            roleId: '',
            createDate: new Date().toJSON(),
            modifyDate: '',
            thumbnail: '',
            description: '',
            content: ''
          }
        }).catch((err) => {
          this.loading = false
          this.status = err
        })
      }
    },
    setTab (tabIndex) {
      this.tab = tabIndex
    },
    close () {
      if (this.newFlag) {
        this.$router.push('/author')
      } else {
        this.$router.push('/author/' + this.author._id)
      }
    },
    save () {
      if (this.author._id.length < 1 || this.author.name.length < 1) {
        // can't save new author
        this.status = 'Enter Username before Saving'
        return
      }

      // get time ISO-8601
      this.author.modifyDate = new Date().toJSON()

      this.$store.dispatch('updateAuthor', this.author).then(() => {
        console.log('saved author')
        this.status = 'Saved (' + moment(this.syncTime).fromNow() + ')'
      }).catch((err) => {
        console.log(err)
        this.status = err.message
      })
    },
    destroy () {
      if (this.newFlag) {
        // can't delete new author
        return
      }

      if (confirm('Are you sure you want to delete this author?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('deleteAuthor', this.currentAuthor).then(() => {
          this.author = null
          console.log('deleted author')
          this.status = 'Author was deleted'
          setTimeout(() => {
            this.$router.push('/author')
          }, 2500)
        }).catch((err) => {
          console.log(err)
          this.status = err.message
        })
      }
    }
  }
}
</script>

<style>
#author-edit {
  height: calc(100% - 6.5rem);
}
</style>
