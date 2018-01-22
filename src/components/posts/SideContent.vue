<template>
  <div class="full-height">

    <div class="contextbar border-bottom background-solid-lightgrey">
      <div class="padding full-width">
        <input type="text" placeholder="Search within view..." v-model="text" v-on:keyup="search" />&nbsp;
        <button class="button button-small border-none hover-shadow hover-background-solid-white" v-on:click="clearSearch" v-if="text !== null">&#10006;</button>
      </div>
    </div>

    <div id="list" class="background-solid-white border-left border-right full-height scrollable text-left animated fadeIn">

      <p class="super-center text-center" v-if="posts === null || posts.length < 1">
        <em v-if="text === null">No posts found.</em>
        <em v-if="text !== null">No results found for '{{ text }}'.</em>
      </p>

      <a class="overflow-none" :href="'/#/post/' + post._id" v-for="post in posts">
        <div class="row padding border-bottom margin-none hover-background-solid-lightgrey" v-bind:class="{ 'active': currentPost !== null && post._id === currentPost._id }">
          <p class="margin-none">{{ post.title | shortTitle }}</p>
          <small>{{ post.description | shortDesc }}</small>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app-side-content',
  data () {
    return {
      text: null
    }
  },
  computed: mapGetters({
    posts: 'getAllPosts',
    currentPost: 'getCurrentPost'
  }),
  created () {
    this.clearSearch()
  },
  methods: {
    clearSearch () {
      this.$store.dispatch('allPosts')
      this.text = null
    },
    search () {
      this.text = this.text.toLowerCase()

      if (this.text.length < 1) {
        // clear search if they delete
        this.clearSearch()
      }

      this.$store.dispatch('searchPosts', this.text).then(result => {
        // successful search
      }).catch(err => {
        // failed search
        console.log(err)
      })
    }
  },
  filters: {
    shortTitle: function (string) {
      if (string.length > 45) {
        return string.substring(0, 45) + '...'
      } else {
        return string
      }
    },
    shortDesc: function (string) {
      if (string.length > 60) {
        return string.substring(0, 60) + '...'
      } else {
        return string
      }
    }
  }
}
</script>

<style>
#list a {
  color: initial;
}
#list {
  height: calc(100% - 6.5rem);
}
.overflow-none {
  overflow: none;
}
.row.active {
  color: #FFFFFF;
  background: var(--blue);
}
.row.active:hover {
  background: var(--light-blue);
}
</style>
