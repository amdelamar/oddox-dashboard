<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="four columns tabs">
      <button class="tab button" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)">Content</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)">Sharing</button>
      <button class="tab button" v-bind:class="{ 'active': tab == 2 }" v-on:click="setTab(2)">Advanced</button>
    </div>
    <div class="eight columns padding text-right" v-if="post !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;Save</button>&nbsp;
      <button class="button" v-on:click="publish"><i class="icon-clock"></i>&nbsp;Publish</button>&nbsp;
      <button class="button button-red button-red-outline" v-on:click="remove"><i class="icon-cross"></i>&nbsp;Delete</button>&nbsp;
      <button class="button" v-on:click="close">Cancel</button>&nbsp;
    </div>
  </div>

  <div id="post-edit" class="border-left background-solid-white scrollable">

    <p class="super-center text-center animated fadeIn" v-if="loading">
      <i class="icon-spinner6 animated rewind"></i><br/>
      <em class="text-bold">Loading...</em>
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
        <!-- Sharing -->
        <h5>{{ post.title | shorten(45) }}</h5>
        <div class="row padding-top">
          <label for="desc">Description</label>
          <input type="text" id="desc" class="full-width" v-model="post.description" />
        </div>
        <div class="row">
          <div class="twelve columns">
            <label for="thumbnail">Thumbnail</label>
            <input type="text" id="thumbnail" class="full-width" v-model="post.thumbnail" />
          </div>
        </div>
        <div class="row padding-top">
          <div class="twelve columns">
            <label for="banner">Banner</label>
            <input type="text" id="banner" class="full-width" v-model="post.banner" />
          </div>
        </div>
        <div class="row padding-top">
          <label for="bannerCaption">Banner Caption</label>
          <input type="text" id="bannerCaption" class="full-width" v-model="post.bannerCaption" />
        </div>
      </div>
      <div v-if="tab == 2">
        <!-- Advanced -->
        <h5>{{ post.title | shorten(45) }}</h5>
        <div class="row padding-top">
          <div class="six columns">
            <label for="cat"><i class="icon-folder-open"></i>&nbsp;Category</label>
            <input type="text" id="cat" class="full-width" v-model="post.category" />
          </div>
          <div class="six columns">
            <label for="tags"><i class="icon-price-tag"></i>&nbsp;Tags</label>
            <input type="text" id="tags" class="full-width" v-model="post.tags" />
          </div>
        </div>
        <div class="row">
          <label for="uri">Post path</label>
          <span class="text-darkgrey">https://{{ appConfig.settings.domain || 'mydomain.com' }}/blog/</span><input type="text" id="uri" style="width:25rem;" v-model="post._id" />
        </div>
        <div class="row padding-top">
          <p class="padding-bottom-large left">
            <i class="icon-user"></i>&nbsp;Author: <code>{{ post.authorId || '(you)' }}</code><br/>
            <i class="icon-star-empty"></i>&nbsp;Is Featured: <code>{{ post.featured || 'false' }}</code><br/>
            <i class="icon-clock"></i>&nbsp;Is Published: <code>{{ post.published || 'false' }}</code><br/>
            <i class="icon-bin"></i>&nbsp;Is Deleted: <code>{{ post.deleted || 'false' }}</code>
          </p>
          <p class="padding-bottom-large right">
            Created: {{ post.createDate }}<br/>
            Modified: {{ post.modifyDate }}<br/>
            Published: {{ post.publishDate }}<br/>
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
    appConfig: 'getAppConfig',
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
      this.status = 'Published'
      console.log('published post')
    },
    save () {
      const data = {
        '_id': this.post._id,
        '_rev': this.post._rev,
        'title': this.post.title,
        'authorId': this.post.authorId,
        'category': this.post.category,
        'tags': this.post.tags,
        'featured': this.post.featured,
        'published': this.post.published,
        'createDate': this.post.createDate,
        'modifiyDate': new Date().toJSON(),
        'publishDate': this.post.publishDate,
        'thumbnail': this.post.thumbnail,
        'banner': this.post.banner,
        'bannerCaption': this.post.bannerCaption,
        'description': this.post.description,
        'content': this.post.content
      }
      this.$store.dispatch('updatePost', data).then(() => {
        // todo
        console.log('saved post')
        this.status = 'Saved'
      }).catch((err) => {
        console.log(err)
        this.status = err
      })
    },
    remove () {
      if (confirm('Are you sure you want to delete this post?\nIt cannot be undone if you do.')) {
        console.log('deleted post')
        this.status = 'Deleted'
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
