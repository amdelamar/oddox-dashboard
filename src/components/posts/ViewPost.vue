<template>
<div class="full-height">

  <div class="contextbar border-bottom border-tertiary background-lightgrey">
    <div class="padding text-right" v-if="post !== null">
      <button class="button" v-on:click="edit"><i class="icon-quill"></i>&nbsp;Edit</button>
      <button class="button button-small margin-left border-none background-grey hover-shadow" v-on:click="close"><i class="icon-cross"></i></button>
    </div>
  </div>

  <div id="post-view" class="border-right border-tertiary background-white scrollable">

    <p class="super-center text-center" v-if="post === null">
      <i class="icon-radio-unchecked text-grey text-largest"></i><br/>
      <em class="text-darkgrey">No post selected.</em>
    </p>

    <div class="full-height padding-large" v-if="post !== null">
      <img v-if="post.banner !== null && post.banner.length > 0" class="margin-bottom-large shadow round full-width" alt="" :src="post.banner" />

      <h1 v-if="post.title !== null && post.title.length > 0">{{ post.title }}</h1>
      <div v-if="post.content !== null && post.content.length > 0" v-html="post.content"></div>
      <hr/>
      <div class="row padding-top">
        <p class="four columns">
          <i class="icon-user"></i>&nbsp;Author: <code>{{ post.authorId || '(you)' }}</code><br/>
          <i class="icon-users"></i>&nbsp;Co-Authors: <code v-for="coa in post.coauthorIds">{{ coa }}</code><br/>
          <i class="icon-users"></i>&nbsp;Editors: <code v-for="edt in post.editorIds">{{ edt }}</code><br/>
          <br/>
          <i class="icon-star-empty"></i>&nbsp;Is Featured: <code>{{ post.featured || 'false' }}</code><br/>
          <i class="icon-pushpin"></i>&nbsp;Is Published: <code>{{ post.published || 'false' }}</code><br/>
          <i class="icon-bin"></i>&nbsp;Is Deleted: <code>{{ post.deleted || 'false' }}</code>
        </p>
        <p class="four columns">
          <i class="icon-folder"></i>&nbsp;Category: <code>{{ post.category || '' }}</code><br/>
          <i class="icon-price-tag"></i>&nbsp;Tags: <code v-for="tag in post.tags">{{ tag || '' }}</code><br/>
        </p>
        <p class="four columns">
          <i class="icon-clock"></i>&nbsp;Created: <code>{{ post.createDate || '' }}</code><br/>
          <i class="icon-clock"></i>&nbsp;Modified: <code>{{ post.modifyDate || '' }}</code><br/>
          <i class="icon-clock2"></i>&nbsp;Published: <code>{{ post.publishDate || '' }}</code><br/>
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
