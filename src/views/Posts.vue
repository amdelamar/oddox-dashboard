<template>
  <div id="posts">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="side-content columns full-height">
      <post-list></post-list>
    </section>
    <section class="main-content columns full-height">
      <post-view></post-view>
    </section>
  </main>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ViewPost from '@/components/posts/ViewPost'
import ListPosts from '@/components/posts/ListPosts'

export default {
  name: 'posts',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'post-list': ListPosts,
    'post-view': ViewPost
  }
}
</script>

<style>
#posts {
  height: 100%;
  width: 100%;
}
</style>
