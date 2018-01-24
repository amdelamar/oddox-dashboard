<template>
  <div id="posts">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="side-content columns full-height">
      <post-list-content></post-list-content>
    </section>
    <section class="main-content columns full-height">
      <post-view-content></post-view-content>
    </section>
  </main>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ViewContent from '@/components/posts/ViewContent'
import ListContent from '@/components/posts/ListContent'

export default {
  name: 'posts',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'post-list-content': ListContent,
    'post-view-content': ViewContent
  }
}
</script>

<style>
#posts {
  height: 100%;
  width: 100%;
}
</style>
