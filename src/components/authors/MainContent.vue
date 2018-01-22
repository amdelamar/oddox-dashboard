<template>
<div class="full-height">

  <div class="contextbar padding border-bottom background-solid-grey">
    <div class="text-right" v-if="author !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-small" v-on:click="save">Save</button>&nbsp;
      <div class="button button-red dropdown button-small">Delete
        <div class="dropdown-body padding-none">
          <button class="button button-red button-small" v-on:click="remove">Are you sure?</button>
        </div>
      </div>&nbsp;
      <button class="button button-small" v-on:click="close">Close</button>
    </div>
  </div>

  <div id="content" class="background-solid-white scrollable">

    <p class="padding-top text-center" v-if="author === null">
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
      } else {
        this.$store.dispatch('setCurrentAuthor', null)
        this.status = ''
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
      if (confirm('Are you sure you want to delete?')) {
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
.button-small {
  font-size: .75em;
  height: 3rem;
  padding: 0 1em;
  line-height: 2.8rem;
}
</style>
