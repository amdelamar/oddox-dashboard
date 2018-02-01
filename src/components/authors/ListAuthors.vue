<template>
  <div class="full-height">

    <div class="contextbar border-bottom background-solid-lightgrey">
      <div class="row padding">
        <input type="text" style="margin:0;" placeholder="Search..." v-model="text" v-on:keyup="search" />
        <button class="button button-small margin-left border-none background-solid-grey hover-shadow" v-on:click="clearSearch" v-if="text.length > 0"><i class="icon-cross"></i></button>
        <button class="button button-blue button-blue-outline right" v-on:click="newAuthor"><i class="icon-plus"></i>&nbsp;New</button>
      </div>
    </div>

    <div id="author-list" class="background-solid-white border-left border-right full-height scrollable text-left animated fadeIn">

      <p class="super-center text-center" v-if="authors === null || authors.length < 1">
        <i class="icon-search text-grey text-largest"></i><br/>
        <em class="text-darkgrey" v-if="text === null">No authors found.</em>
        <em class="text-darkgrey" v-if="text !== null">No results found for '{{ text }}'.</em>
      </p>
      <p class="super-center text-center animated fadeIn" v-if="message.length > 0">
        <i class="icon-notification text-red text-largest"></i><br/>
        <em class="text-red text-bold">{{ message }}</em>
      </p>

      <a class="overflow-none" :href="'/#/author/' + author._id" v-for="author in authors">
        <div class="row item padding border-bottom margin-none hover-background-solid-lightgrey" v-bind:class="{ 'active': currentAuthor !== null && author._id === currentAuthor._id }">
          <p class="margin-none text-nowrap">{{ author.name | shorten(45) }}</p>
          <span class="text-small text-nowrap">{{ author.description | shorten(60) }}</span>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'author-list',
  data () {
    return {
      text: '',
      message: ''
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
      this.text = ''
      this.message = ''
      this.search()
    },
    newAuthor () {
      this.$store.dispatch('setCurrentAuthor', null)
      this.$router.push('/new-author')
    },
    search () {
      this.text = this.text.toLowerCase()

      this.$store.dispatch('searchAllAuthors', this.text).then(result => {
        // successful search
      }).catch(err => {
        // failed search
        console.log(err)
        this.message = err.message
      })
    }
  }
}
</script>

<style>
#author-list a {
  color: initial;
}
#author-list {
  height: calc(100% - 6.5rem);
}
#author-list .item {
  transition: all 0.3s ease;
}
#author-list .item.active {
  color: #FFFFFF;
  background: var(--blue);
}
#author-list .item.active:hover {
  background: var(--light-blue);
}
</style>
