<template>
  <div id="edit-author">

  <app-navbar></app-navbar>

  <main id="main" role="main">
    <section class="two columns full-height">
      <app-sidebar></app-sidebar>
    </section>
    <section class="full-main-content columns full-height">
      <author-edit></author-edit>
    </section>
  </main>

  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import EditAuthor from '@/components/authors/EditAuthor'
import ListAuthors from '@/components/authors/ListAuthors'

export default {
  name: 'authors',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'author-list': ListAuthors,
    'author-edit': EditAuthor
  }
}
</script>

<style>
#edit-author {
  height: 100%;
  width: 100%;
}
</style>
