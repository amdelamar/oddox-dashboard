<template>
  <div class="full-height border-right animated fadeIn">

    <div class="contextbar padding border-bottom background-solid-grey">
      <div class="margin-none left">
        <input type="text" class="full-width" placeholder="Search within view..." v-model="text" />
      </div>
      <div class="text-right">
        <button class="button" v-on:click="search">Search</button>
      </div>
    </div>

    <div id="list" class="background-solid-white full-height scrollable text-left">
      <!-- placeholder for now -->
      <a class="overflow-none" :href="'/#/post/' + post._id" v-for="post in posts">
        <div class="row padding border-bottom margin-none hover-shadow">
          <p class="text-capitalize margin-none">{{ post.title | shortTitle }}</p>
          <small>{{ post.description | shortDesc }}</small>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
import store from '../store'

export default {
  name: 'app-side-content',
  data () {
    return {
      text: '',
      posts: []
    }
  },
  created () {
    store.loadPosts(this, 'posts')
    text: ''
  },
  methods: {
    search () {
      this.text = this.text.toLowerCase()
      console.log('search for: ' + this.text)
      let newPosts = []
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].title.toLowerCase().indexOf(this.text) !== -1) {
          newPosts.push(this.posts[i])
        }
      }
      this.posts = newPosts
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
</style>
