<template>
  <div id="app-side-content" class="row border-right animated fadeIn">

    <div class="contextbar row padding border-bottom">
      <div class="margin-none left">
        <input type="text" class="full-width" placeholder="Search within view..." v-model="text" />
      </div>
      <div class="text-right">
        <button class="button" v-on:click="search">Search</button>
      </div>
    </div>

    <div class="row full-height scrollable text-left">
      <!-- placeholder for now -->
      <a :href="'/#/post/' + post._id" v-for="post in posts">
        <div class="row padding border-bottom margin-none hover-shadow">
          <span class="text-capitalize">{{ post.title }}</span><br/>
          <small>{{ post.description }} | <code>{{ post.date }}</code></small>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app-side-content',
  data () {
    return {
      title: 'Hello World!',
      text: '',
      // junk posts for now
      posts: [
        { _id: 'hello-world', title: 'Hello World!', description: 'This is a test.', date: 'Mar 2nd, 2017' },
        { _id: 'something-cool', title: 'Something cool', description: 'This is a test.', date: 'Mar 2nd, 2017' },
        { _id: 'bvs-was-bad', title: 'Batman v Superman was Bad', description: 'This is a test.', date: 'Mar 2nd, 2017' },
        { _id: 'oddox-blogging', title: 'Oddox blogging platform', description: 'This is a test.', date: 'Mar 2nd, 2017' },
        { _id: 'javascript-tips', title: 'JavaScript tips and tricks', description: 'This is a test.', date: 'Mar 2nd, 2017' },
        { _id: 'first', title: 'First!', description: 'This is a test.', date: 'Mar 2nd, 2017' }
      ]
    }
  },
  methods: {
    search () {
      console.log('search for: ' + this.text)
    }
  }
}
</script>

<style>
#app-side-content {
  height: 100%;
}
#app-side-content a {
  color: initial;
}
</style>
