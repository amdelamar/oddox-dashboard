<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="padding text-right" v-if="post !== null">
      <button class="button" v-on:click="edit"><i class="icon-quill"></i>&nbsp;Edit</button>&nbsp;
      <button class="button button-small border-none background-solid-grey hover-shadow" v-on:click="close"><i class="icon-cross"></i></button>
    </div>
  </div>

  <div id="post-view" class="background-solid-white scrollable">

    <p class="super-center text-center" v-if="post === null">
      <i class="icon-radio-unchecked text-lightgrey text-largest"></i><br/>
      <em class="text-grey">No post selected.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="post !== null">
      <img v-if="post.banner !== null && post.banner.length > 0" class="margin-bottom-large shadow round full-width" alt="" :src="post.banner" />

      <h1 v-if="post.title !== null && post.title.length > 0">{{ post.title }}</h1>
      <div v-if="post.content !== null && post.content.length > 0" v-html="post.content"></div>
      <hr/>
      <div class="row padding-top">
        <p class="six columns">
          <i class="icon-user"></i>&nbsp;Author: <code>{{ post.authorId || '(you)' }}</code><br/>
          <i class="icon-star-empty"></i>&nbsp;Is Featured: <code>{{ post.featured || 'false' }}</code><br/>
          <i class="icon-pushpin"></i>&nbsp;Is Published: <code>{{ post.published || 'false' }}</code><br/>
          <i class="icon-bin"></i>&nbsp;Is Deleted: <code>{{ post.deleted || 'false' }}</code>
        </p>
        <p class="six columns">
          <i class="icon-clock"></i>&nbsp;Created: <code>{{ post.createDate || 'null' }}</code><br/>
          <i class="icon-clock"></i>&nbsp;Modified: <code>{{ post.modifyDate || 'null' }}</code><br/>
          <i class="icon-clock2"></i>&nbsp;Published: <code>{{ post.publishDate || 'null' }}</code><br/>
        </p>
      </div>
    </div>

  </div>
</div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'post-view',
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
        // document.getElementById('post-view').scrollTop = 0
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
#post-view {
  height: calc(100% - 6.5rem);
}
</style>
