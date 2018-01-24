<template>
<div class="full-height">

  <div class="contextbar border-bottom background-solid-lightgrey">
    <div class="padding text-right" v-if="author !== null">
      <code v-if="status.length > 0">{{ status }}</code>&nbsp;
      <button class="button button-blue button-blue-outline" v-on:click="save"><i class="icon-checkmark"></i>&nbsp;Save</button>&nbsp;
      <button class="button button-red button-red-outline" v-on:click="remove"><i class="icon-cross"></i>&nbsp;Delete</button>&nbsp;
      <button class="button" v-on:click="close">Cancel</button>&nbsp;
    </div>
  </div>

  <div id="content" class="border-left background-solid-white scrollable">

    <p class="super-center text-center" v-if="author === null">
      <em>Nothing to show.</em>
    </p>

    <div class="full-height padding-large animated fadeIn" v-if="author !== null">
      <img v-if="author.thumbnail.length > 0" class="margin-bottom-large shadow round left margin-right-large" height="65" width="65" alt="" :src="author.thumbnail" />
      <h3>{{ author.name }}</h3>
      <span class="text-darkgrey">Note: Name and other fields can only be changed in 'My Profile'.</span>

      <br/><br/>

      <label for="desc">Short Bio</label>
      <textarea id="desc" class="full-width" placeholder="A short description about me..." v-model="author.description"></textarea>

      <br/><br/>
      <label for="content">Full Page Bio</label>
      <textarea id="content" class="full-width full-height" v-model="author.content"></textarea>

      <hr/>
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
  name: 'author-view-content',
  data () {
    return {
      status: 'Opened',
      preview: false
    }
  },
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
      } else {
        // this.$store.dispatch('setCurrentAuthor', null)
      }
    },
    close () {
      this.$router.push('/author/' + this.author._id)
    },
    save () {
      const data = {
        '_id': this.author._id,
        '_rev': this.author._rev,
        'name': this.author.name,
        'email': this.author.email,
        'roleId': this.author.roleId,
        'createDate': this.author.createDate,
        'modifiyDate': new Date().toJSON(),
        'thumbnail': this.author.thumbnail,
        'description': this.author.description,
        'content': this.author.content
      }
      this.$store.dispatch('updateAuthor', data).then(() => {
        // todo
        console.log('saved author')
        this.status = 'Saved'
      }).catch((err) => {
        console.log(err)
        this.status = err
      })
    },
    remove () {
      if (confirm('Are you sure you want to delete this author?\nIt cannot be undone if you do.')) {
        console.log('deleted author')
        this.status = 'Deleted'
      }
    }
  }
}
</script>

<style>
#content {
  height: calc(100% - 6.5rem);
}
.super-center {
  position: relative;
  width: 200px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -100px;
}
</style>
