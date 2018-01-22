<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="padding text-right" v-if="author !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue" v-on:click="save">Save</button>&nbsp;
      <button class="button button-red" v-on:click="remove">Delete</button>&nbsp;
      <button class="button button-small border-none hover-shadow hover-background-solid-white" v-on:click="close">&#10006;</button>
    </div>
  </div>

  <div id="content" class="background-solid-white scrollable">

    <p class="super-center text-center" v-if="author === null">
      <em>Nothing to show.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="author !== null">
      <img v-if="author.thumbnail.length > 0" class="margin-bottom-large shadow round left margin-right-large" height="150" width="150" alt="" :src="author.thumbnail" />

      <h1>{{ author.name }}</h1>
      <div v-html="author.content"></div>
      <hr/>
      <p class="padding-bottom-large left">
        Username: <code>{{ author._id }}</code><br/>
        Email: <code>{{ author.email }}</code><br/>
        Role: <code>{{ author.roleId }}</code>
      </p>
      <p class="padding-bottom-large right">
        Created: {{ author.createDate }}<br/>
        Modified: {{ author.modifyDate }}<br/>
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
    author: 'getCurrentAuthor'
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
        this.$store.dispatch('setCurrentAuthor', this.$route.params.id)
        this.status = 'Opened'
        document.getElementById('content').scrollTop = 0
      } else {
        // this.$store.dispatch('setCurrentAuthor', null)
        // this.status = ''
      }
    },
    close () {
      this.status = ''
      this.$store.dispatch('setCurrentAuthor', null)
      this.$router.push('/author')
    },
    save () {
      this.status = ''
      const data = {
        '_id': this.author._id,
        '_rev': this.author._rev,
        'title': this.author.title,
        'authorId': this.author.authorId,
        'category': this.author.category,
        'tags': this.author.tags,
        'featured': this.author.featured,
        'published': this.author.published,
        'createDate': this.author.createDate,
        'modifiyDate': new Date().toJSON(),
        'publishDate': this.author.publishDate,
        'thumbnail': this.author.thumbnail,
        'banner': this.author.banner,
        'bannerCaption': this.author.bannerCaption,
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
      this.status = ''
      if (confirm('Are you sure you want to delete this author?\nIt cannot be undone if you do.')) {
        console.log('deleted author')
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
.super-center {
  position: relative;
  width: 200px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -100px;
}
</style>
