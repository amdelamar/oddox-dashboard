<template>
<div id="home">

  <app-navbar></app-navbar>

  <main id="main" class="row full-height" role="main">
    <div class="two columns full-height margin-none">
      <app-sidebar></app-sidebar>
    </div>
    <div id="sideColumn" class="three columns full-height">
      <app-side-content></app-side-content>
    </div>
    <div id="mainColumn" class="seven columns full-height">
      <app-main-content></app-main-content>
    </div>
  </main>

</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import SideContent from '@/components/SideContent'

export default {
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'app-main-content': MainContent,
    'app-side-content': SideContent
  }
}
</script>

<style>
#home {
  height: 100%;
}
#sideColumn {
  width: 26%;
  margin: 0;
}
#mainColumn {
  width: 60.6666666667%;
  margin: 0;
}
.contextbar {
  min-height: 7rem;
  width: 100%;
}
</style>
