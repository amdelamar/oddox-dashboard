<template>
<div class="full-height">

  <div class="contextbar border-bottom background-lightgrey">
    <div class="four columns tabs">
      <button class="tab button" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)">Content</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)">Preview</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 2 }" v-on:click="setTab(2)">Details</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 3 }" v-on:click="setTab(3)"><i class="icon-cogs"></i></button>
    </div>
    <div class="eight columns padding text-right" v-if="post !== null">
      <code v-if="message.length > 0">{{ message }}</code>&nbsp;
      <button class="button button-primary button-primary-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;{{ newFlag ? 'Create' : 'Save' }}</button>
      <button class="button" v-bind:class="{ 'button-primary': !post.published }" v-on:click="publish"><i class="icon-pushpin"></i>&nbsp;{{ !post.published ? 'Publish' : 'Unpublish' }}</button>
      <button class="button" v-bind:class="{ 'button-danger': !post.deleted }" v-if="!newFlag" v-on:click="trash"><i class="icon-cross"></i>&nbsp;{{ !post.deleted ? 'Trash' : 'Recover' }}</button>
      <button class="button" v-on:click="close">Cancel</button>
    </div>
  </div>

  <div id="post-edit" class="border-left background-white scrollable">

    <p class="super-center text-center text-darkgrey" v-if="loading">
      <i class="icon-spinner9 animated spin"></i><br/>
      <em>Loading...</em>
    </p>
    <p class="super-center text-center" v-if="post === null && message.length > 0">
      <i class="icon-notification text-danger text-largest"></i><br/>
      <em class="text-danger text-bold">{{ message }}</em>
    </p>

    <div class="full-height padding-large" v-if="post !== null && !loading">

      <div class="row full-height" v-if="tab == 0">
        <!-- Content -->
        <div class="row">
          <label for="title">Title</label>
          <input type="text" id="title" class="full-width text-medium" v-model="post.title" v-on:keyup="createUri()" />
        </div>
        <div class="row">
          <label>Content</label>
          <wysiwyg v-model="post.content" />
        </div>
      </div>
      <div class="row full-height" v-if="tab == 1">
        <!-- Preview -->
        <img v-if="post.banner.length > 0" class="margin-bottom-large shadow round full-width" alt="" :src="post.banner" />
        <h1 v-if="post.title.length > 0">{{ post.title}}</h1>
        <div v-if="post.content.length > 0" v-html="post.content"></div>
        <p v-if="post.content.length < 1" class="super-center text-center">
          <i class="icon-radio-unchecked text-lightgrey text-largest"></i><br/>
          <em class="text-grey">Nothing to show yet!</em>
        </p>
      </div>
      <div class="row full-height" v-if="tab == 2">
        <!-- Details -->
        <h2>{{ post.title | shorten(45) }}</h2>
        <div class="row">
          <label for="cat"><i class="icon-folder-open"></i>&nbsp;Category</label><span class="text-darkgrey">Single keyword to group similar posts together.</span><br/>
          <input type="text" id="cat" class="" v-model="post.category" />
        </div>
        <div class="row padding-top">
          <label for="tags"><i class="icon-price-tag"></i>&nbsp;Tags</label><span class="text-darkgrey">Comma separated list of keywords.</span><br/>
          <input type="text" id="tags" style="width:50%;min-width:25rem;" v-model="tags" v-on:keyup="createTags()" />
        </div>
        <div class="row padding-top">
          <label for="desc">Description</label><span class="text-darkgrey">A short one or two sentences to describe your post.</span>
          <input type="text" id="desc" class="full-width" v-model="post.description" />
        </div>
        <div class="row padding-top">
          <div class="twelve columns">
            <label for="thumbnail"><i class="icon-image"></i>&nbsp;Thumbnail</label><span class="text-darkgrey">An image to represent your post, e.g. on social media.</span>
            <input type="text" id="thumbnail" class="full-width" v-model="post.thumbnail" />
          </div>
        </div>
        <div class="row padding-top">
          <div class="twelve columns">
            <label for="banner"><i class="icon-image"></i>&nbsp;Banner</label><span class="text-darkgrey">A large image at the top of your post, usually above the title.</span>
            <input type="text" id="banner" class="full-width" v-model="post.banner" />
          </div>
        </div>
        <div class="row padding-top">
          <label for="bannerCaption">Banner Caption</label><span class="text-darkgrey">Captioning or alternative text for your banner image.</span>
          <input type="text" id="bannerCaption" class="full-width" v-model="post.bannerCaption" />
        </div>
      </div>
      <div class="row full-height" v-if="tab == 3">
        <!-- Advanced -->
        <h2>{{ post.title | shorten(45) }}</h2>
        <div class="row">
          <input type="checkbox" id="feat1" value="true" v-model="post.featured" />
          <label class="text-normal" for="feat1"><i class="icon-star-empty"></i>&nbsp;Featured</label>
          <span class="text-darkgrey">Highlight this post amongst the rest. You can change this anytime.</span>
          <br/><br/>
        </div>
        <div class="row">
          <label><i class="icon-user"></i>&nbsp;Author&nbsp;<code>{{ post.authorId || '(you)' }}</code></label>
        </div>
        <div class="row padding-top">
          <label for="coauthors"><i class="icon-users"></i>&nbsp;Co-Authors</label><span class="text-darkgrey">Comma separated list of Co-Authors. Leave empty for none.</span><br/>
          <input type="text" id="coauthors" style="width:50%;min-width:25rem;" v-model="coauthors" v-on:keyup="createCoAuthors()" />
          <br/><span>Co-Authors can edit and make changes to this post, and usually are public and appear next to the Author's name for credit.</span><br/><br/>
        </div>
        <div class="row padding-top">
          <label for="editors"><i class="icon-users"></i>&nbsp;Editors</label><span class="text-darkgrey">Comma separated list of Editors. Leave empty for none.</span><br/>
          <input type="text" id="editors" style="width:50%;min-width:25rem;" v-model="editors" v-on:keyup="createEditors()" />
          <br/><span>Editors can edit and make changes to this post, but are usually not public.</span><br/><br/>
        </div>
        <div class="row padding-top">
          <label for="uri"><i class="icon-link"></i>&nbsp;Post path</label>
          <span class="text-darkgrey">https://{{ 'mydomain.com' }}/blog/</span><input type="text" id="uri" :disabled="!newFlag" style="width:25rem;" v-model="post._id" />
          <br/><span>Post path must be unique. Use lowercase letters, no spaces, no symbols, and try to keep it short.<br/>Once saved, the path cannot be changed later.</span><br/><br/>
        </div>
        <div class="row padding-top">
          <p class="five columns">
            <i class="icon-star-empty"></i>&nbsp;Is Featured: <code>{{ post.featured || 'false' }}</code><br/>
            <i class="icon-pushpin"></i>&nbsp;Is Published: <code>{{ post.published || 'false' }}</code><br/>
            <i class="icon-bin"></i>&nbsp;Is Deleted: <code>{{ post.deleted || 'false' }}</code>
          </p>
          <p class="five columns">
            <i class="icon-clock"></i>&nbsp;Created: <code>{{ post.createDate || 'null' }}</code><br/>
            <i class="icon-clock"></i>&nbsp;Modified: <code>{{ post.modifyDate || 'null' }}</code><br/>
            <i class="icon-clock2"></i>&nbsp;Published: <code>{{ post.publishDate || 'null' }}</code><br/>
          </p>
        </div>
        <hr/>
        <div class="row padding-top padding-bottom">
          <h3>Danger Zone</h3>
          <p>Careful! These actions may permanently destroy data.</p>
          <button class="button button-danger" v-on:click="destroy"><i class="icon-cross"></i>&nbsp;Delete</button>
        </div>
      </div> <!-- end of tabs -->

    </div>

  </div>
</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'post-edit',
  data () {
    return {
      post: {},
      coauthors: '',
      editors: '',
      tags: '',
      newFlag: false,
      tab: 0,
      loading: true,
      message: ''
    }
  },
  computed: mapGetters({
    authToken: 'getAuthToken',
    currentPost: 'getCurrentPost'
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
        // edit post
        this.$store.dispatch('setCurrentPost', this.$route.params.id).then(() => {
          this.loading = false
          this.post = JSON.parse(JSON.stringify(this.currentPost))
          this.tags = this.post.tags.toString()
          this.coauthors = this.post.coauthorIds.toString()
          this.editors = this.post.editorIds.toString()
        }).catch((err) => {
          this.loading = false
          this.message = err
        })
      } else {
        // new post
        this.$store.dispatch('setCurrentPost', null).then(() => {
          this.loading = false
          this.newFlag = true
          this.post = {
            _id: '',
            title: '',
            authorId: this.authToken.username,
            coauthorIds: [],
            editorIds: [],
            category: '',
            tags: [],
            featured: false,
            published: false,
            deleted: false,
            createDate: new Date().toJSON(),
            modifyDate: '',
            publishDate: '',
            thumbnail: '',
            banner: '',
            bannerCaption: '',
            description: '',
            content: ''
          }
          this.tags = ''
          this.coauthors = ''
          this.editors = ''
        }).catch((err) => {
          this.loading = false
          this.message = err
        })
      }
    },
    createUri () {
      // cleanup title to create uri
      let temp = this.post.title.toLowerCase()
      while (temp.indexOf(' ') >= 0) {
        temp = temp.replace(' ', '-')
      }
      this.post._id = temp
    },
    createEditors () {
      // cleanup editor input
      // comma separated, no spaces
      let temp = this.editors
      while (temp.indexOf(', ') >= 0) {
        temp = temp.replace(', ', '-')
      }
      while (temp.indexOf(' ') >= 0) {
        temp = temp.replace(' ', '-')
      }
      while (temp.indexOf(',,') >= 0) {
        temp = temp.replace(',,', ',')
      }
      this.editors = temp
    },
    createCoAuthors () {
      // cleanup coauthor input
      // comma separated, no spaces
      let temp = this.coauthors
      while (temp.indexOf(', ') >= 0) {
        temp = temp.replace(', ', '-')
      }
      while (temp.indexOf(' ') >= 0) {
        temp = temp.replace(' ', '-')
      }
      while (temp.indexOf(',,') >= 0) {
        temp = temp.replace(',,', ',')
      }
      this.coauthors = temp
    },
    createTags () {
      // cleanup tag input
      // comma separated, no spaces
      let temp = this.tags
      while (temp.indexOf(', ') >= 0) {
        temp = temp.replace(', ', '-')
      }
      while (temp.indexOf(' ') >= 0) {
        temp = temp.replace(' ', '-')
      }
      while (temp.indexOf(',,') >= 0) {
        temp = temp.replace(',,', ',')
      }
      this.tags = temp
    },
    setTab (tabIndex) {
      this.tab = tabIndex
    },
    close () {
      if (this.newFlag) {
        this.$router.push('/post')
      } else {
        this.$router.push('/post/' + this.post._id)
      }
    },
    publish () {
      if (this.post.published) {
        this.post.published = false
      } else {
        this.post.published = true
        this.post.deleted = false

        // get time ISO-8601
        this.post.publishDate = new Date().toJSON()
      }
    },
    save () {
      if (this.post._id.length < 1 || this.post.title.length < 1) {
        // can't save new post
        this.message = 'Enter Title before Saving'
        return
      }

      // split strings into arrays
      this.post.tags = this.tags.length > 1 ? this.tags.split(',') : []
      this.post.coauthorIds = this.coauthors.length > 1 ? this.coauthors.split(',') : []
      this.post.editorIds = this.editors.length > 1 ? this.editors.split(',') : []

      // get time ISO-8601
      this.post.modifyDate = new Date().toJSON()

      this.$store.dispatch('updatePost', this.post).then((result) => {
        // check if creating new post
        if (this.newFlag) {
          console.log('Created post: ' + this.post._id)
          this.message = 'Created (' + moment(this.syncTime).fromNow() + ')'
          this.newFlag = false
        } else {
          console.log('Saved post: ' + this.post._id)
          this.message = 'Saved (' + moment(this.syncTime).fromNow() + ')'
        }
        // retrieve new _id and _rev
        this.post._id = result.id
        this.post._rev = result.rev
      }).catch((err) => {
        console.log(err)
        this.message = err
      })
    },
    trash () {
      if (this.post.deleted) {
        this.post.deleted = false
      } else {
        this.post.published = false
        this.post.deleted = true
      }
    },
    destroy () {
      if (this.newFlag) {
        // can't delete new post
        return
      }

      if (confirm('Are you sure you want to delete this post?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('deletePost', this.currentPost).then(() => {
          console.log('Deleted post: ' + this.post._id)
          this.post = null
          this.message = 'Post was deleted'
          setTimeout(() => {
            this.$router.push('/post')
          }, 2500)
        }).catch((err) => {
          console.log(err)
          this.message = err
        })
      }
    }
  }
}
</script>

<style>
#post-edit {
  height: calc(100% - 6.5rem);
}
</style>
