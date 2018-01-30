<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="padding text-right" v-if="author !== null">
      <button class="button" v-on:click="edit"><i class="icon-quill"></i>&nbsp;Edit</button>
      <button class="button button-small margin-left border-none background-solid-grey hover-shadow" v-on:click="close"><i class="icon-cross"></i></button>
    </div>
  </div>

  <div id="author-view" class="background-solid-white scrollable">

    <p class="super-center text-center" v-if="author === null">
      <i class="icon-radio-unchecked text-lightgrey text-largest"></i><br/>
      <em class="text-grey">No author selected.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="author !== null">
      <img v-if="author.thumbnail.length > 0" class="margin-bottom-large shadow round left margin-right-large" height="150" width="150" alt="" :src="author.thumbnail" />

      <h1>{{ author.name }}</h1>
      <div v-html="author.content"></div>
      <hr/>
      <p class="padding-bottom-large left">
        <i class="icon-user"></i>&nbsp;Username: <code>{{ author._id }}</code><br/>
        <i class="icon-envelop"></i>&nbsp;Email: <code>{{ author.email }}</code><br/>
        <i class="icon-price-tag"></i>&nbsp;Role: <code>{{ author.roleId }}</code>
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
  name: 'author-view',
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
        // document.getElementById('author-view').scrollTop = 0
      } else {
        // this.$store.dispatch('setCurrentAuthor', null)
      }
    },
    close () {
      this.$store.dispatch('setCurrentAuthor', null)
      this.$router.push('/author')
    },
    edit () {
      this.$router.push('/edit-author/' + this.author._id)
    }
  }
}
</script>

<style>
#author-view {
  height: calc(100% - 6.5rem);
}
</style>
