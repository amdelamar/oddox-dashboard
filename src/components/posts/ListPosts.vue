<template>
  <div class="full-height">

    <div class="contextbar border-bottom background-solid-lightgrey">
      <div class="row padding">
        <input type="text" style="margin:0;" placeholder="Search..." v-model="text" v-on:keyup="search" />
        <button class="button button-small margin-left border-none background-solid-grey hover-shadow" v-on:click="clearSearch" v-if="text.length > 0"><i class="icon-cross"></i></button>

        <div class="right">
        <span class="button button-small dropdown border-none background-solid-grey hover-shadow">&#9662;
          <div class="dropdown-body padding border round text-left background-solid-white">
            <span class="text-darkgrey">View Options</span>
            <hr class="margin"/>

            <input type="radio" group="size" id="comfort" v-model="option.mode" value="0" />
            <label for="comfort"><span class="text-small">Comfortable Size</span></label>
            <input type="radio" group="size" id="compact" v-model="option.mode" value="1" />
            <label for="compact"><span class="text-small">Compact Size</span></label>
            <hr class="margin"/>

            <input type="checkbox" id="showDesc" v-model="option.showDesc" />
            <label for="showDesc"><span class="text-small"><i class="icon-eye"></i>&nbsp;Show Descriptions</span></label>
            <input type="checkbox" id="showStar" v-model="option.showStar" />
            <label for="showStar"><span class="text-small"><i class="icon-star-full"></i>&nbsp;Show Featured</span></label>
            <input type="checkbox" id="showCat" v-model="option.showCat" />
            <label for="showCat"><span class="text-small"><i class="icon-folder"></i>&nbsp;Show Category</span></label>
            <input type="checkbox" id="showTags" v-model="option.showTags" />
            <label for="showTags"><span class="text-small"><i class="icon-price-tag"></i>&nbsp;Show Tags</span></label>

          </div>
        </span>
        </div>
      </div>
    </div>

    <div id="post-list" class="background-solid-white border-left border-right full-height scrollable text-left animated fadeIn">

      <p class="super-center text-center" v-if="posts === null || posts.length < 1">
        <span v-if="text === null || text.length == 0">
          <i class="icon-stack text-grey text-largest"></i><br/>
          <em class="text-darkgrey">No posts found.</em>
        </span>
        <span v-if="text !== null && text.length > 0">
          <i class="icon-search text-grey text-largest"></i><br/>
          <em class="text-darkgrey">No results found for '{{ text }}'.</em>
        </span>
      </p>
      <p class="super-center text-center animated fadeIn" v-if="message.length > 0">
        <i class="icon-notification text-red text-largest"></i><br/>
        <em class="text-red text-bold">{{ message }}</em>
      </p>

      <div v-for="post in posts" class="post-item" v-bind:class="{ 'active': currentPost !== null && post._id === currentPost._id }">
        <router-link :to="{ name:'view-post', params:{ id:post._id }}">
          <div class="row padding-left border-bottom margin-none" v-bind:class="{ 'padding': option.mode == 0 }">
            <p class="margin-none text-nowrap">
              <span v-if="option.showStar && post.featured" class="icon-star-full right margin-right"></span>
              {{ post.title | shorten(45) }}<br/>
              <span v-if="option.showDesc" class="text-small text-nowrap">{{ post.description | shorten(60) }}<br/></span>
              <span v-if="option.showCat" class="text-small text-nowrap" title="category">
                <code>{{ post.category || ' ' }}</code>
              </span>
              <span v-if="option.showCat && option.showTags" class="text-grey">&nbsp;|&nbsp;</span>
              <span v-if="option.showTags" class="text-small text-nowrap" title="tags">
                <code v-for="tag in post.tags">{{ tag || ' ' }}</code>
              </span>
            </p>
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
      option: {
        mode: 0,
        showDesc: true,
        showStar: true,
        showCat: false,
        showTags: false
      },
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
          this.message = err
        })
      } else if (this.$route.name.indexOf('featured') !== -1) {
        this.$store.dispatch('searchFeatured', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err
        })
      } else if (this.$route.name.indexOf('drafts') !== -1) {
        this.$store.dispatch('searchDrafts', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err
        })
      } else if (this.$route.name.indexOf('trash') !== -1) {
        this.$store.dispatch('searchTrash', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err
        })
      } else {
        this.$store.dispatch('searchPosts', this.text).then(result => {
          // successful search
        }).catch(err => {
          // failed search
          console.log(err)
          this.message = err
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
  color: var(--white);
}
#post-list .post-item.active code {
  background: transparent;
}
#post-list .post-item:hover {
  background: var(--light-grey);
}
#post-list .post-item.active:hover {
  background: var(--light-blue);
}
.contextbar .dropdown-body {
  min-width: 21rem;
  left: -17.6rem;
}
</style>
