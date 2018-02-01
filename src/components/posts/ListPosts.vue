<template>
  <div class="full-height">

    <div class="contextbar border-bottom background-solid-lightgrey">
      <div class="row padding">
        <input type="text" style="margin:0;" placeholder="Search..." v-model="text" v-on:keyup="search" />
        <button class="button button-small margin-left border-none background-solid-grey hover-shadow" v-on:click="clearSearch" v-if="text.length > 0"><i class="icon-cross"></i></button>
      </div>
    </div>

    <div id="post-list" class="background-solid-white border-left border-right full-height scrollable text-left animated fadeIn">

      <p class="super-center text-center" v-if="posts === null || posts.length < 1">
        <i class="icon-search text-grey text-largest"></i><br/>
        <em class="text-darkgrey" v-if="text === null">No posts found.</em>
        <em class="text-darkgrey" v-if="text !== null">No results found for '{{ text }}'.</em>
      </p>
      <p class="super-center text-center animated fadeIn" v-if="message.length > 0">
        <i class="icon-notification text-red text-largest"></i><br/>
        <em class="text-red text-bold">{{ message }}</em>
      </p>

      <div v-for="post in posts" class="post-item" v-bind:class="{ 'active': currentPost !== null && post._id === currentPost._id }">
        <router-link :to="{ name:'view-post', params:{ id:post._id }}">
          <div class="row padding border-bottom margin-none">
            <p class="margin-none text-nowrap">{{ post.title | shorten(45) }}</p>
            <span class="text-small text-nowrap">{{ post.description | shorten(60) }}</span>
          </div>
        </router-link>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'post-list',
  data () {
    return {
      text: '',
      message: ''
    }
  },
  computed: mapGetters({
    posts: 'getAllPosts',
    currentPost: 'getCurrentPost'
  }),
  created () {
    this.clearSearch()
  },
  watch: {
    '$route': 'search'
  },
  methods: {
    clearSearch () {
      this.text = ''
      this.message = ''
      this.search()
    },
    search () {
      this.text = this.text.toLowerCase()

      if (this.$route.name.indexOf('all-posts') !== -1) {
        this.$store.dispatch('searchAllPosts', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err.message
        })
      } else if (this.$route.name.indexOf('drafts') !== -1) {
        this.$store.dispatch('searchAllDrafts', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err.message
        })
      } else if (this.$route.name.indexOf('trash') !== -1) {
        this.$store.dispatch('searchAllDrafts', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err.message
        })
      } else if (this.$route.name.indexOf('posts') !== -1) {
        this.$store.dispatch('searchAllPosts', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err.message
        })
      }
    }
  }
}
</script>

<style>
#post-list a {
  color: initial;
}
#post-list {
  height: calc(100% - 6.5rem);
}
#post-list .post-item {
  transition: all 0.3s ease;
  overflow: hidden;
}
#post-list .post-item.active {
  background: var(--blue);
}
#post-list .post-item.active, #post-list .post-item.active a {
  color: #FFFFFF;
}
#post-list .post-item:hover {
  background: var(--light-grey);
}
#post-list .post-item.active:hover {
  background: var(--light-blue);
}
</style>
