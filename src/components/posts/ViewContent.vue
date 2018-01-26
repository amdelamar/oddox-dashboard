<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="padding text-right" v-if="post !== null">
      <button class="button" v-on:click="edit"><i class="icon-quill"></i>&nbsp;Edit</button>&nbsp;
      <button class="button button-small border-none background-solid-grey hover-shadow" v-on:click="close"><i class="icon-cross"></i></button>
    </div>
  </div>

  <div id="content" class="background-solid-white scrollable">

    <p class="super-center text-center" v-if="post === null">
      <i class="icon-radio-unchecked text-lightgrey text-largest"></i><br/>
      <em class="text-grey">No post selected.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="post !== null">
      <img v-if="post.banner.length > 0" class="margin-bottom-large shadow round full-width" alt="" :src="post.banner" />

      <h1>{{ post.title }}</h1>
      <div v-html="post.content"></div>
      <hr/>
      <p class="padding-bottom-large left">
        <i class="icon-user"></i>&nbsp;Author: <code>{{ post.authorId }}</code><br/>
        <i class="icon-folder-open"></i>&nbsp;Category: <code>{{ post.category }}</code><br/>
        <i class="icon-price-tag"></i>&nbsp;Tags: <code v-for="tag in post.tags">{{ tag }}</code>
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'post-view-content',
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
        document.getElementById('content').scrollTop = 0
      } else {
        // this.$store.dispatch('setCurrentPost', null)
      }
    },
    close () {
      this.$store.dispatch('setCurrentPost', null)
      this.$router.push('/post')
    },
    edit () {
      this.status = ''
      this.$router.push('/edit-post/' + this.post._id)
    }
  }
}
</script>

<style>
#content {
  height: calc(100% - 6.5rem);
}
</style>
