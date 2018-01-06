<template>
<div id="home" class="h-100">
	<app-navbar></app-navbar>
	<main class="container-fluid h-100">
	<div class="row">
		<div class="col-sm-3 col-md-3 col-lg-2 px-0">
			<app-sidebar></app-sidebar>
		</div>
		<div class="col-sm-9 col-md-9 col-lg-10 px-0">
			<app-content></app-content>
		</div>
	</div>
	</main>
	<app-footer></app-footer>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Content from '@/components/Content'

export default {
  name: 'home',
  components: {
    'app-navbar': Navbar,
    'app-sidebar': Sidebar,
    'app-content': Content,
    'app-footer': Footer
  }
}
</script>

<style>
</style>
