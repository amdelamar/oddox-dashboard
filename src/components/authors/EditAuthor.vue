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
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;Save</button>&nbsp;
      <button class="button button-red button-red-outline" v-on:click="remove"><i class="icon-cross"></i>&nbsp;Delete</button>&nbsp;
      <button class="button" v-on:click="close">Cancel</button>&nbsp;
    </div>
  </div>

  <div id="author-edit" class="border-left background-solid-white scrollable">

    <p class="super-center text-center animated fadeIn" v-if="loading">
      <i class="icon-spinner6 animated rewind"></i><br/>
      <em class="text-bold">Loading...</em>
    </p>
    <p class="super-center text-center animated fadeIn" v-if="author === null && status.length > 0">
      <i class="icon-notification text-red text-largest"></i><br/>
      <em class="text-red text-bold">Oops! Nothing to show.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="author !== null">

      <div v-if="tab == 0">
        <!-- Account -->
        <h4>{{ author.name }}</h4>
        <div class="row">
          <label for="desc">Short Bio</label>
          <textarea id="desc" class="full-width" placeholder="A short description about me..." v-model="author.description"></textarea>
        </div>
        <div class="row padding-top">
          <label for="cont">Full Page Bio</label>
          <textarea id="cont" class="full-width" style="height:30rem;" v-model="author.content"></textarea>
        </div>
      </div>
      <div v-if="tab == 1">
        <!-- Profile -->
        <div class="row padding-top">
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

      </div>
      <div v-if="tab == 2">
        <!-- Advanced -->
        <h4>{{ author.name }}</h4>
        <div class="row">
          <p>
            Created: {{ author.createDate }}<br/>
            Modified: {{ author.modifyDate }}<br/>
          </p>
        </div>
      </div>
    </div>

  </div>
</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'author-edit',
  data () {
    return {
      author: null,
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
        this.$store.dispatch('setCurrentAuthor', this.$route.params.id).then(() => {
          this.loading = false
          this.author = JSON.parse(JSON.stringify(this.currentAuthor))
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
      this.$router.push('/author/' + this.author._id)
    },
    save () {
      const data = {
        '_id': this.author._id,
        '_rev': this.author._rev,
        'name': this.author.name,
        'email': this.author.email,
        'roleId': this.author.roleId,
        'createDate': this.author.createDate,
        'modifiyDate': new Date().toJSON(),
        'thumbnail': this.author.thumbnail,
        'description': this.author.description,
        'content': this.author.content
      }
      this.$store.dispatch('updateAuthor', data).then(() => {
        // todo
        console.log('saved author')
        this.status = 'Saved'
      }).catch((err) => {
        console.log(err)
        this.status = err
      })
    },
    remove () {
      if (confirm('Are you sure you want to delete this author?\nIt cannot be undone if you do.')) {
        console.log('deleted author')
        this.status = 'Deleted'
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
