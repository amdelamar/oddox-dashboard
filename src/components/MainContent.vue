<template>
<div class="full-height">

  <div class="contextbar padding border-bottom background-solid-grey">
    <div class="text-right">

      <code v-if="status.length > 0">{{ status }}</code>&nbsp;

      <button class="button button-blue" v-on:click="save">Save</button>&nbsp;
      <button class="button" v-on:click="publish">Publish</button>&nbsp;
      <button class="button button-red" v-on:click="remove">Delete</button>
    </div>
  </div>

  <div id="content" class="padding-large scrollable background-solid-white animated fadeIn">

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
</template>

<script>
import store from '../store'

export default {
  name: 'app-main-content',
  data () {
    return {
      post: null,
      status: ''
    }
  },

  created () {
    this.read()
    status: ''
  },

  watch: {
    '$route': 'read'
  },

  methods: {
    read () {
      store.readPost(this.$route.params.id).then((doc) => {
        this.post = doc
      })
    },
    publish () {
      this.status = 'Published'
      console.log('published')
    },
    save () {
      this.status = 'Saving...'
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
      store.updatePost(data).then(() => {
        store.readPost(data._id).then((doc) => {
          this.post = doc
        })
        this.status = 'Successfully Saved.'
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
