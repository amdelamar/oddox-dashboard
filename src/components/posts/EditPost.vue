<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="four columns tabs">
      <button class="tab button" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)">Content</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)">Details</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 2 }" v-on:click="setTab(2)">Preview</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 3 }" v-on:click="setTab(3)"><i class="icon-cog"></i></button>
    </div>
    <div class="eight columns padding text-right" v-if="post !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;Save</button>
      <button class="button" v-bind:class="{ 'button-blue button-blue-outline': !post.published }" v-on:click="publish"><i class="icon-pushpin"></i>&nbsp;{{ !post.published ? 'Publish' : 'Unpublish' }}</button>
      <button class="button" v-bind:class="{ 'button-red button-red-outline': !post.deleted }" v-if="!newFlag" v-on:click="trash"><i class="icon-cross"></i>&nbsp;{{ !post.deleted ? 'Trash' : 'Recover' }}</button>
      <button class="button" v-on:click="close">Cancel</button>
    </div>
  </div>

  <div id="post-edit" class="border-left background-solid-white scrollable">

    <p class="super-center text-center text-darkgrey animated fadeIn" v-if="loading">
      <i class="icon-spinner9 animated spin"></i><br/>
      <em>Loading...</em>
    </p>
    <p class="super-center text-center animated fadeIn" v-if="post === null && status.length > 0">
      <i class="icon-notification text-red text-largest"></i><br/>
      <em class="text-red text-bold">{{ status }}</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="post !== null && !loading">

      <div class="row full-height" v-if="tab == 0">
        <!-- Content -->
        <div class="row">
          <label for="title">Title</label>
          <input type="text" id="title" class="full-width text-medium" v-model="post.title" v-on:keyup="createUri()" />
        </div>

        <div class="row">
          <label for="content">Content</label>
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
            <textarea id="content" class="editor-textbox full-width" style="height:30rem;" v-model="post.content" placeholder="<p>Begin writing here...</p>"></textarea>
          </div>
        </div>
      </div>
      <div class="row full-height" v-if="tab == 1">
        <!-- Details -->
        <h2>{{ post.title | shorten(45) }}</h2>
        <div class="row">
          <label for="cat"><i class="icon-folder-open"></i>&nbsp;Category</label><span class="text-darkgrey">Single keyword to group similar posts together.</span><br/>
          <input type="text" id="cat" class="" v-model="post.category" />
        </div>
        <div class="row padding-top">
          <label for="tags"><i class="icon-price-tag"></i>&nbsp;Tags</label><span class="text-darkgrey">Comma separated list of keywords.</span><br/>
          <input type="text" id="tags" style="width:50%;min-width:25rem;" v-model="post.tags" />
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
      <div class="row full-height" v-if="tab == 2">
        <!-- Preview -->
        <img v-if="post.banner.length > 0" class="margin-bottom-large shadow round full-width" alt="" :src="post.banner" />
        <h1 v-if="post.title.length > 0">{{ post.title}}</h1>
        <div v-if="post.content.length > 0" v-html="post.content"></div>
        <p v-if="post.content.length < 1" class="super-center text-center">
          <i class="icon-radio-unchecked text-lightgrey text-largest"></i><br/>
          <em class="text-grey">Nothing to show yet!</em>
        </p>
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
        <div class="row padding-top">
          <label for="uri"><i class="icon-link"></i>&nbsp;Post path</label>
          <span class="text-darkgrey">https://{{ 'mydomain.com' }}/blog/</span><input type="text" id="uri" :disabled="!newFlag" style="width:25rem;" v-model="post._id" />
          <br/><span class="text-darkgrey">Post path must be unique. Use lowercase letters, no spaces, no symbols, and try to keep it short.<br/>Once saved, the path cannot be changed later.</span>
        </div>
        <div class="row padding-top">
          <p class="six columns">
            <i class="icon-user"></i>&nbsp;Author: <code>{{ post.authorId || '(you)' }}</code><br/>
            <i class="icon-pushpin"></i>&nbsp;Is Published: <code>{{ post.published || 'false' }}</code><br/>
            <i class="icon-bin"></i>&nbsp;Is Deleted: <code>{{ post.deleted || 'false' }}</code>
          </p>
          <p class="six columns">
            <i class="icon-clock"></i>&nbsp;Created: <code>{{ post.createDate || 'null' }}</code><br/>
            <i class="icon-clock"></i>&nbsp;Modified: <code>{{ post.modifyDate || 'null' }}</code><br/>
            <i class="icon-clock2"></i>&nbsp;Published: <code>{{ post.publishDate || 'null' }}</code><br/>
          </p>
        </div>
        <hr/>
        <div class="row padding-top padding-bottom">
          <h3>Danger Zone</h3>
          <p>Careful! These actions may permanently destroy data.</p>
          <button class="button button-red" v-on:click="destroy"><i class="icon-cross"></i>&nbsp;Delete</button>
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
      newFlag: false,
      tab: 0,
      loading: true,
      status: '',
      bold: false
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
        }).catch((err) => {
          this.loading = false
          this.status = err
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
        }).catch((err) => {
          this.loading = false
          this.status = err
        })
      }
    },
    createUri () {
      let temp = this.post.title.toLowerCase()
      while (temp.indexOf(' ') >= 0) {
        temp = temp.replace(' ', '-')
      }
      this.post._id = temp
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
        this.status = 'Enter Title before Saving'
        return
      }

      // get time ISO-8601
      this.post.modifyDate = new Date().toJSON()

      this.$store.dispatch('updatePost', this.post).then(() => {
        console.log('Saved post')
        this.status = 'Saved (' + moment(this.syncTime).fromNow() + ')'
      }).catch((err) => {
        console.log(err)
        this.status = err.message
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
          this.post = null
          console.log('deleted post')
          this.status = 'Post was deleted'
          setTimeout(() => {
            this.$router.push('/post')
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
#post-edit {
  height: calc(100% - 6.5rem);
}
</style>
