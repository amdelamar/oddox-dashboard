<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="padding text-right" v-if="post !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save">Save</button>&nbsp;
      <button class="button" v-on:click="publish">Publish</button>&nbsp;
      <button class="button button-red button-red-outline" v-on:click="remove">Delete</button>&nbsp;
      <button class="button" v-on:click="close">Cancel</button>&nbsp;
    </div>
  </div>

  <div id="content" class="border-left background-solid-white scrollable">

    <p class="super-center text-center" v-if="post === null">
      <em>Nothing to show.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="post !== null">

      <div class="row">
        <label for="title">Title</label>
        <input type="text" id="title" class="full-width" v-model="post.title" />
      </div>
      <div class="row padding-top">
        <label for="uri">URI</label>
        <input type="text" id="uri" class="full-width" v-model="post._id" />
      </div>
      <div class="row padding-top">
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
      <div class="row padding-top">
        <label for="desc">Description</label>
        <input type="text" id="desc" class="full-width" v-model="post.description" />
      </div>
      <div class="row padding-top">
        <div class="six columns">
          <label for="cat">Category</label>
          <input type="text" id="cat" class="full-width" v-model="post.category" />
        </div>
        <div class="six columns">
          <label for="tags">Tags</label>
          <input type="text" id="tags" class="full-width" v-model="post.tags" />
        </div>
      </div>
      <div class="row padding-top">
        <label for="content">Content</label>
        <textarea id="content" class="full-width full-height" v-model="post.content"></textarea>
      </div>
      <div class="row padding-top">
        <p class="padding-bottom-large left">
          Author: <code>{{ post.authorId }}</code><br/>
          Published: <code>{{ post.published }}</code><br/>
          Deleted: <code>{{ post.deleted }}</code>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'post-view-content',
  data () {
    return {
      status: 'Opened'
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
      } else {
        // this.$store.dispatch('setCurrentPost', null)
      }
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
#content {
  height: calc(100% - 6.5rem);
}
.button-small {
  font-size: .75em;
  height: 3rem;
  padding: 0 1em;
  line-height: 2.8rem;
}
</style>
