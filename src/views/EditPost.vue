<template>
  <div id="edit-post">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns full-height">
      <post-edit></post-edit>
    </section>
  </main>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import EditPost from '@/components/posts/EditPost'
import ListPosts from '@/components/posts/ListPosts'

export default {
  name: 'posts',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'post-list': ListPosts,
    'post-edit': EditPost
  }
}
</script>

<style>
#edit-post {
  height: 100%;
  width: 100%;
}
</style>
