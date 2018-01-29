<template>
  <div class="full-height">

    <div class="contextbar border-bottom background-solid-lightgrey">
      <div class="row padding">
        <input type="text" style="margin:0;" placeholder="Search..." v-model="text" v-on:keyup="search" />&nbsp;
        <button class="button button-small border-none background-solid-grey hover-shadow" v-on:click="clearSearch" v-if="text.length > 0"><i class="icon-cross"></i></button>
      </div>
    </div>

    <div id="post-list" class="background-solid-white border-left border-right full-height scrollable text-left animated fadeIn">

      <p class="super-center text-center" v-if="posts === null || posts.length < 1">
        <i class="icon-search text-grey text-largest"></i><br/>
        <em class="text-darkgrey" v-if="text === null">No posts found.</em>
        <em class="text-darkgrey" v-if="text !== null">No results found for '{{ text }}'.</em>
      </p>

      <a class="overflow-none" :href="'/#/post/' + post._id" v-for="post in posts">
        <div class="row item padding border-bottom margin-none hover-background-solid-lightgrey" v-bind:class="{ 'active': currentPost !== null && post._id === currentPost._id }">
          <p class="margin-none text-nowrap">{{ post.title | shorten(45) }}</p>
          <span class="text-small text-nowrap">{{ post.description | shorten(60) }}</span>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'post-list',
  data () {
    return {
      text: ''
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
      this.text = ''
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
#post-list .item {
  transition: all 0.3s ease;
}
#post-list .item.active {
  color: #FFFFFF;
  background: var(--blue);
}
#post-list .item.active:hover {
  background: var(--light-blue);
}
</style>
