<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="four columns tabs">
      <button class="tab button" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)">Profile</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)">Preview</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 2 }" v-on:click="setTab(2)">Account</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 3 }" v-on:click="setTab(3)"><i class="icon-cog"></i></button>
    </div>
    <div class="eight columns padding text-right" v-if="author !== null">
      <code v-if="message.length > 0">{{ message }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;{{ newFlag ? 'Create' : 'Save' }}</button>
      <button class="button" v-on:click="close">Cancel</button>
    </div>
  </div>

  <div id="author-edit" class="border-left background-solid-white scrollable">

    <p class="super-center text-center text-darkgrey animated fadeIn" v-if="loading">
      <i class="icon-spinner9 animated spin"></i><br/>
      <em>Loading...</em>
    </p>
    <p class="super-center text-center animated fadeIn" v-if="author === null && message.length > 0">
      <i class="icon-notification text-red text-largest"></i><br/>
      <em class="text-red text-bold">{{ message }}</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="author !== null && !loading">

      <div class="row full-height" v-if="tab == 0">
        <!-- Profile -->
        <div class="row">
          <label for="name">Display Name</label>
          <input type="text" id="name" class="text-medium" style="width:30%;min-width:25rem;" v-model="author.name" placeholder="My Name" />
        </div>
        <div class="row padding-top">
          <label for="desc">Short Description</label>
          <textarea id="desc" class="full-width" placeholder="A short description about me..." v-model="author.description"></textarea>
        </div>
        <div class="row padding-top">
          <label for="cont">About Me / Long Description</label>
          <div class="editor full-width">
            <div class="editor-toolbar full-width">
                <select id="fontFamily">
                  <option value="Arial">Arial</option>
                  <option value="Helvetica">Helvetica</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Roboto">Roboto</option>
                </select>
                <select id="fontSize">
                  <option value="8pt">8pt</option>
                  <option value="10pt">10pt</option>
                  <option value="12pt">12pt</option>
                  <option value="14pt">14pt</option>
                  <option value="16pt">16pt</option>
                  <option value="18pt">18pt</option>
                  <option value="24pt">24pt</option>
                  <option value="36pt">36pt</option>
                  <option value="48pt">48pt</option>
                  <option value="64pt">64pt</option>
                  <option value="72pt">72pt</option>
                </select>
                <span class="border-left margin-left margin-right"></span>
                <button class="button" :class="{'active':bold}" v-on:click="bold = !bold"><i class="icon-bold"></i></button>
                <button class="button"><i class="icon-italic"></i></button>
                <button class="button"><i class="icon-underline"></i></button>
                <button class="button"><i class="icon-strikethrough"></i></button>
                <span class="border-left margin-left margin-right"></span>
                <button class="button"><i class="icon-paragraph-left"></i></button>
                <button class="button"><i class="icon-paragraph-center"></i></button>
                <button class="button"><i class="icon-paragraph-right"></i></button>
                <button class="button"><i class="icon-indent-increase"></i></button>
                <button class="button"><i class="icon-indent-decrease"></i></button>
                <span class="border-left margin-left margin-right"></span>
                <button class="button"><i class="icon-list-numbered"></i></button>
                <button class="button"><i class="icon-list"></i></button>
                <button class="button"><i class="icon-table"></i></button>
                <button class="button"><i class="icon-image"></i></button>
                <button class="button"><i class="icon-link"></i></button>
                <span class="border-left margin-left margin-right"></span>
                <button class="button"><i class="icon-superscript"></i></button>
                <button class="button"><i class="icon-subscript"></i></button>
            </div>
            <textarea id="content" class="editor-textbox full-width" style="height:30rem;" v-model="author.content" placeholder="<p>\nA few paragraphs about me...\n</p>"></textarea>
          </div>
        </div>
      </div>
      <div class="row full-height" v-if="tab == 1">
        <!-- Preview -->
        <img v-if="author.thumbnail.length > 0" class="margin-bottom-large shadow round left margin-right-large" height="150" width="150" alt="Profile Picture" :src="author.thumbnail" />
        <h1 v-if="author.name.length > 0">{{ author.name }}</h1>
        <div v-if="author.content.length > 0" v-html="author.content"></div>
        <p v-if="author.content.length < 1" class="super-center text-center">
          <i class="icon-radio-unchecked text-lightgrey text-largest"></i><br/>
          <em class="text-grey">Nothing to show yet!</em>
        </p>
      </div>
      <div class="row full-height" v-if="tab == 2">
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
      <div class="row full-height" v-if="tab == 3">
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
      message: '',
      loading: true,
      preview: false,
      bold: false
    }
  },
  computed: mapGetters({
    authToken: 'getAuthToken',
    currentAuthor: 'getCurrentAuthor'
  }),
  created () {
    this.read()
  },
  watch: {
    '$route': 'read'
  },
  methods: {
    accessCheck () {
      if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
        // is user trying to edit themselves?
        if (this.$route.params.id === this.authToken.username) {
          // console.log('Authorized: User can edit themselves.')
          return true
        } else if (!this.authToken.serverAdmin) {
          // only server admins can edit other authors
          console.log('Unauthorized. User cannot edit other users.')
          return false
        } else if (this.authToken.serverAdmin) {
          // console.log('Authorized: Server admin can edit other users.')
          return true
        }
      } else if (this.authToken.serverAdmin) {
        // only server admins can create new authors
        return true
      }
      console.log('Unauthorized. You are not a server administrator.')
      return false
    },
    read () {
      // quick access check
      if (!this.accessCheck()) {
        this.$router.push('/unauthorized')
        return
      }
      // load author if possible
      if (this.$route.params.id !== null && this.$route.params.id !== undefined) {
        // edit author
        this.$store.dispatch('setCurrentAuthor', this.$route.params.id).then(() => {
          this.loading = false
          this.author = JSON.parse(JSON.stringify(this.currentAuthor))
        }).catch((err) => {
          this.loading = false
          this.message = err.message
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
          this.message = err.message
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
      if (this.author._id.length < 1) {
        // can't save new author
        this.message = 'Enter Username before Saving'
        this.setTab(2)
        return
      }
      if (this.author.name.length < 1) {
        this.author.name = 'Anonymous'
      }

      // get time ISO-8601
      this.author.modifyDate = new Date().toJSON()

      this.$store.dispatch('updateAuthor', this.author).then(() => {
        // check if creating new author
        if (this.newFlag) {
          // create new user also
          let newUser = {
            _id: 'org.couchdb.user:' + this.author._id,
            name: this.author._id,
            roles: [
              'author'
            ],
            type: 'user',
            password: 'oddox' /* default password */
          }
          this.$store.dispatch('updateUser', newUser).then(() => {
            console.log('Created author & user: ' + this.author._id)
            this.message = 'Created (' + moment(this.syncTime).fromNow() + ')'
            this.newFlag = false
          }).catch((err) => {
            console.log(err)
            this.message = err.message
          })
        } else {
          console.log('Saved author: ' + this.author._id)
          this.message = 'Saved (' + moment(this.syncTime).fromNow() + ')'
        }
      }).catch((err) => {
        console.log(err)
        this.message = err.message
      })
    },
    destroy () {
      if (this.newFlag) {
        // can't delete new author
        return
      }

      if (confirm('Are you sure you want to delete this author?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('deleteAuthor', this.currentAuthor).then(() => {
          console.log('Deleted author: ' + this.author._id)
          this.author = null
          this.message = 'Author was deleted'
          setTimeout(() => {
            this.$router.push('/author')
          }, 2500)
        }).catch((err) => {
          console.log(err)
          this.message = err.message
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
