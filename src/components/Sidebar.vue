<template>
<div id="app-sidebar" class="container-fluid h-100">
	<a href="#" class="btn btn-primary btn-block my-2" role="button">New
		Post &raquo;</a>
	<ul class="list-group border-0">
		<li class="list-group-item border-0"><a href="#"
			class="btn-block text-dark"><i class="fa fa-file-text"></i>&nbsp;&nbsp;Drafts
				<sup class="badge badge-pill badge-light">1</sup></a></li>
		<li class="list-group-item border-0"><a href="#"
			class="btn-block text-dark"><i class="fa fa-archive"></i>&nbsp;&nbsp;All
				Posts</a></li>
		<li class="list-group-item border-0"><a href="#"
			class="btn-block text-dark"><i class="fa fa-star"></i>&nbsp;&nbsp;Featured</a></li>
		<li class="list-group-item border-0"><a href="#"
			class="btn-block text-dark"><i class="fa fa-tag"></i>&nbsp;&nbsp;Tags</a></li>
		<li class="list-group-item border-0"><a href="#"
			class="btn-block text-dark"><i class="fa fa-folder"></i>&nbsp;&nbsp;Categories</a></li>
		<li class="list-group-item border-0"><a href="#"
			class="btn-block text-dark"><i class="fa fa-clock-o"></i>&nbsp;&nbsp;Years</a></li>
		<li
			class="list-group-item border border-bottom-0 border-left-0 border-right-0"><a
			href="#" class="btn-block text-dark"><i class="fa fa-trash"></i>&nbsp;&nbsp;Trash
				<sup class="badge badge-pill badge-light">2</sup></a></li>
	</ul>
</div>
</template>

<script>
export default {
  name: 'app-sidebar',
  data () {
    return {
      label: 'Sidebar'
    }
  }
}
</script>

<style>
</style>
