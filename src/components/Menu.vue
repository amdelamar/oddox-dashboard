<template>
  <nav id="app-menu" class="sidebar border-right shadow-right">
    <div class="nav-item-close">
        <a class="right" title="Close Menu" href="javascript:closeSidebar()" aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2.757 14.657L8 9.414l5.243 5.243 1.414-1.414L9.414 8l5.243-5.243-1.414-1.414L8 6.586 2.757 1.343 1.343 2.757 6.586 8l-5.243 5.243z" fill-rule="evenodd"></path></svg>
        </a>
    </div>
      <div class="nav-list padding text-center" onclick="closeSidebar()">
          <button class="button button-blue full-width" onclick="#new">New</button>
          <a class="nav-item" href="#posts">Posts</a>
          <a class="nav-item" href="#drafts">Drafts</a>
          <a class="nav-item" href="#trash">Trash</a>
          <a class="nav-item" href="#all-posts">All Posts</a>
      </div>
      <div class="padding-top-large full-width text-center">
          <p class="text-small"><em>© <a href="https://oddox.org">Oddox</a> - 2017</em></p>
      </div>
  </nav>
</template>

<script>
export default {
  name: 'app-menu'
}
</script>

<style>
</style>
