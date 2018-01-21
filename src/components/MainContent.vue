<template>
<div class="full-height">

  <div class="contextbar padding border-bottom background-solid-grey">
    <div class="text-right" v-if="post !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue" v-on:click="save">Save</button>&nbsp;
      <button class="button" v-on:click="publish">Publish</button>&nbsp;
      <div class="button button-red dropdown">Delete
        <div class="dropdown-body padding-none">
          <button class="button button-red" v-on:click="remove">Are you sure?</button>
        </div>
      </div>&nbsp;
      <button class="button" v-on:click="close">Close</button>
    </div>
  </div>

  <div id="content" class="background-solid-white scrollable">

    <p class="padding-top text-center" v-if="post === null">
      <em>Nothing to show.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="post !== null">
      <img v-if="post.banner.length > 0" class="margin-bottom-large shadow round full-width" alt="" :src="post.banner" />

      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div>
      <hr/>
      <p class="padding-bottom-large left">
        Author: <code>{{ post.authorId }}</code><br/>
        Category: <code>{{ post.category }}</code><br/>
        Tags: <code v-for="tag in post.tags">{{ tag }}</code>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app-main-content',
  data () {
    return {
      status: ''
    }
  },
  computed: mapGetters({
    post: 'getCurrentPost'
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
        this.$store.dispatch('setCurrentPost', this.$route.params.id)
        this.status = 'Opened'
      } else {
        this.$store.dispatch('setCurrentPost', null)
        this.status = ''
      }
    },
    close () {
      this.status = ''
      this.$store.dispatch('setCurrentPost', null)
      this.$router.push('/')
    },
    publish () {
      this.status = 'Published'
      console.log('published post')
    },
    save () {
      this.status = ''
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
      this.status = ''
      if (confirm('Are you sure you want to delete?')) {
        console.log('deleted post')
        this.status = 'Deleted'
      }
    }
  }
}
</script>

<style>
#content {
  height: calc(100% - 6.5rem);
}
</style>
