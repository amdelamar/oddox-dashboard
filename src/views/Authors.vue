<template>
  <div id="authors">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="side-content columns full-height">
      <author-list></author-list>
    </section>
    <section class="main-content columns full-height">
      <author-view></author-view>
    </section>
  </main>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ViewAuthor from '@/components/authors/ViewAuthor'
import ListAuthors from '@/components/authors/ListAuthors'

export default {
  name: 'authors',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'author-list': ListAuthors,
    'author-view': ViewAuthor
  }
}
</script>

<style>
#authors {
  height: 100%;
  width: 100%;
}
</style>
