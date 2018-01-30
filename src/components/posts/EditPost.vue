<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="four columns tabs">
      <button class="tab button" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)">Content</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)">Details</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 2 }" v-on:click="setTab(2)">Advanced</button>
    </div>
    <div class="eight columns padding text-right" v-if="post !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;Save</button>&nbsp;
      <button class="button" v-bind:class="{ 'button-blue button-blue-outline': !post.published }" v-on:click="publish"><i class="icon-pushpin"></i>&nbsp;{{ !post.published ? 'Publish' : 'Unpublish' }}</button>&nbsp;
      <button class="button" v-bind:class="{ 'button-red button-red-outline': !post.deleted }" v-on:click="trash"><i class="icon-cross"></i>&nbsp;{{ !post.deleted ? 'Trash' : 'Recover' }}</button>&nbsp;
      <button class="button" v-on:click="close">Cancel</button>&nbsp;
    </div>
  </div>

  <div id="post-edit" class="border-left background-solid-white scrollable">

    <p class="super-center text-center text-darkgrey animated fadeIn" v-if="loading">
      <i class="icon-spinner9 animated spin"></i><br/>
      <em>Loading...</em>
    </p>
    <p class="super-center text-center animated fadeIn" v-if="post === null && status.length > 0">
      <i class="icon-notification text-red text-largest"></i><br/>
      <em class="text-red text-bold">Oops! Nothing to show.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="post !== null">

      <div v-if="tab == 0">
        <!-- Content -->
        <div class="row">
          <label for="title">Title</label>
          <input type="text" id="title" class="full-width" v-model="post.title" />
        </div>

        <div class="row padding-top">
          <label for="cont">Content</label>
          <textarea id="cont" class="full-width" style="height:30rem;" v-model="post.content"></textarea>
        </div>
      </div>
      <div v-if="tab == 1">
        <!-- Details -->
        <h5>{{ post.title | shorten(45) }}</h5>
        <div class="row">
          <label for="cat"><i class="icon-folder-open"></i>&nbsp;Category</label><span class="text-darkgrey">Single keyword to group similar posts together.</span><br/>
          <input type="text" id="cat" class="" v-model="post.category" />
        </div>
        <div class="row padding-top">
          <label for="tags"><i class="icon-price-tag"></i>&nbsp;Tags</label><span class="text-darkgrey">Comma separated list of keywords.</span>
          <input type="text" id="tags" class="full-width" v-model="post.tags" />
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
      <div v-if="tab == 2">
        <!-- Advanced -->
        <h5>{{ post.title | shorten(45) }}</h5>
        <div class="row padding-top">
          <label for="uri"><i class="icon-link"></i>&nbsp;Post path</label>
          <span class="text-darkgrey">https://{{ 'mydomain.com' }}/blog/</span><input type="text" id="uri" disabled style="width:25rem;" v-model="post._id" />
        </div>
        <div class="row padding-top">

          <div class="two columns">
            <input type="checkbox" id="feat1" value="true" v-model="post.featured" />
            <label class="text-normal" for="feat1"><i class="icon-star-empty"></i>&nbsp;Featured</label>
          </div>

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
  name: 'post-edit',
  data () {
    return {
      post: null,
      tab: 0,
      loading: true,
      status: ''
    }
  },
  computed: mapGetters({
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
        this.$store.dispatch('setCurrentPost', this.$route.params.id).then(() => {
          this.loading = false
          this.post = JSON.parse(JSON.stringify(this.currentPost))
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
      this.$router.push('/post/' + this.post._id)
    },
    publish () {
      if (this.post.published) {
        this.post.published = false
        this.status = 'Unpublished'
      } else {
        this.post.published = true
        this.status = 'Published'
      }
    },
    save () {
      // get time ISO-8601
      this.post.modifyDate = new Date().toJSON()

      this.$store.dispatch('updatePost', this.post).then(() => {
        console.log('saved post')
        this.status = 'Saved (' + moment(this.syncTime).fromNow() + ')'
      }).catch((err) => {
        console.log(err)
        this.status = err.message
      })
    },
    trash () {
      if (this.post.deleted) {
        this.post.deleted = false
        this.status = 'Recovered from Trash'
      } else {
        this.post.published = false
        this.post.deleted = true
        this.status = 'Moved to Trash'
      }
    },
    delete () {
      if (confirm('Are you sure you want to delete this post?\nIt cannot be undone if you do.')) {
        this.$store.dispatch('deletePost', this.currentPost).then(() => {
          this.post = null
          console.log('deleted post')
          this.status = 'Deleted'
          setTimeout(() => {
            this.$router.push('/post')
          }, 3000)
        }).catch((err) => {
          console.log(err)
          this.status = err
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
