<template>
  <div class="full-height">

    <div class="contextbar padding border-bottom background-solid-lightgrey">
      <div class="margin-none left">
        <input type="text" class="full-width" placeholder="Search within view..." v-model="text" v-on:keyup="search" />
      </div>
      <div class="right">
        <button class="button" v-on:click="clearSearch" v-if="text !== null">Clear Search</button>
      </div>
    </div>

    <div id="list" class="background-solid-white border-left border-right full-height scrollable text-left animated fadeIn">

      <p class="super-center text-center" v-if="authors === null || authors.length < 1">
        <em>No authors found.</em>
      </p>

      <a class="overflow-none" :href="'/#/author/' + author._id" v-for="author in authors">
        <div class="row padding border-bottom margin-none hover-background-solid-lightgrey" v-bind:class="{ 'active': currentAuthor !== null && author._id === currentAuthor._id }">
          <p class="margin-none">{{ author.name | shortTitle }}</p>
          <small>{{ author.description | shortDesc }}</small>
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
    authors: 'getAllAuthors',
    currentAuthor: 'getCurrentAuthor'
  }),
  created () {
    this.clearSearch()
  },
  methods: {
    clearSearch () {
      this.$store.dispatch('allAuthors')
      this.text = null
    },
    search () {
      this.text = this.text.toLowerCase()

      if (this.text.length < 1) {
        // clear search if they delete
        this.clearSearch()
      }

      this.$store.dispatch('searchAuthors', this.text).then(result => {
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
