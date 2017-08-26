<template>
<nav id="app-navbar"
	class="navbar navbar-toggleable-sm navbar-expand-sm navbar-light bg-light navbar-fixed-top mb-2">
	<a class="navbar-brand" href="#">
		<img src="../assets/logo.png" alt="" height="30" width="30">
		{{title}}
	</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse"
		data-target="#navbarsExampleDefault"
		aria-controls="navbarsExampleDefault" aria-expanded="false"
		aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>

	<div class="collapse navbar-collapse" id="navbarsExampleDefault">
		<form class="form-inline mr-auto ml-lg-5">
			<input class="form-control border-secondary bg-transparent mr-lg-2" type="text" placeholder="Search Posts" aria-label="Search">
			<button class="btn btn-light border-0 py-2" type="submit"><i class="fa fa-search text-secondary"></i></button>
		</form>
		<ul class="navbar-nav my-2">
			<li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="No internet connection detected. Will resync when back online.">
				<a class="nav-link btn" href="#">
				<span class="visible-sm visible-xs"><i class="fa fa-plug"></i></span>
				<span class="hidden-sm hidden-xs"><i class="fa fa-plug"></i>&nbsp;Offline</span></a>
			</li>
			<li class="nav-item" data-toggle="tooltip" data-placement="bottom" title="Notifications">
				<a class="nav-link" href="#">
				<i class="fa fa-bell"></i><sup class="badge badge-pill badge-danger">2</sup>
				<span class="hidden-sm hidden-xs">Notifications</span></a>
			</li>
			<li class="nav-item dropdown" data-toggle="tooltip" data-placement="bottom" title="Your Dashboard">
				<a class="nav-link dropdown-toggle" href="#" id="dropdown01"
				data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user-circle"></i>&nbsp;{{ userName }}</a>
				<div class="dropdown-menu" aria-labelledby="dropdown01">
					<a class="dropdown-item" href="#/account">View Profile</a>
					<a class="dropdown-item" href="#/help">Help</a>
					<a class="dropdown-item" href="#/settings">Settings</a>
					<a class="dropdown-item" href="#/logout">Logout</a>
				</div>
			</li>
		</ul>
	</div>
</nav>
</template>

<script>
export default {
  name: 'app-navbar',
  data () {
    return {
      title: 'Dashboard',
      userName: 'amdelamar'
    }
  }
}
</script>

<style>
.visible-xs,
.visible-sm,
.visible-md,
.visible-lg {
  display: none !important;
}
.visible-xs-block,
.visible-xs-inline,
.visible-xs-inline-block,
.visible-sm-block,
.visible-sm-inline,
.visible-sm-inline-block,
.visible-md-block,
.visible-md-inline,
.visible-md-inline-block,
.visible-lg-block,
.visible-lg-inline,
.visible-lg-inline-block {
  display: none !important;
}
@media (max-width: 767px) {
  .visible-xs {
    display: block !important;
  }
  table.visible-xs {
    display: table !important;
  }
  tr.visible-xs {
    display: table-row !important;
  }
  th.visible-xs,
  td.visible-xs {
    display: table-cell !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-block {
    display: block !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline {
    display: inline !important;
  }
}
@media (max-width: 767px) {
  .visible-xs-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm {
    display: block !important;
  }
  table.visible-sm {
    display: table !important;
  }
  tr.visible-sm {
    display: table-row !important;
  }
  th.visible-sm,
  td.visible-sm {
    display: table-cell !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-block {
    display: block !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline {
    display: inline !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .visible-sm-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md {
    display: block !important;
  }
  table.visible-md {
    display: table !important;
  }
  tr.visible-md {
    display: table-row !important;
  }
  th.visible-md,
  td.visible-md {
    display: table-cell !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-block {
    display: block !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline {
    display: inline !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .visible-md-inline-block {
    display: inline-block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg {
    display: block !important;
  }
  table.visible-lg {
    display: table !important;
  }
  tr.visible-lg {
    display: table-row !important;
  }
  th.visible-lg,
  td.visible-lg {
    display: table-cell !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-block {
    display: block !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline {
    display: inline !important;
  }
}
@media (min-width: 1200px) {
  .visible-lg-inline-block {
    display: inline-block !important;
  }
}
@media (max-width: 767px) {
  .hidden-xs {
    display: none !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .hidden-sm {
    display: none !important;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .hidden-md {
    display: none !important;
  }
}
@media (min-width: 1200px) {
  .hidden-lg {
    display: none !important;
  }
}
</style>
