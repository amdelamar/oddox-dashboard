<template>
  <nav id="app-logobar" class="navbar background-lightgrey">
      <div class="navbar-body padding-left padding-right">

        <div class="nav-item-logo">
            <router-link :to="{name:'home'}">
              <img class="background-darkgrey circle margin-left margin-right" src="static/img/icon-circle-light-512.png" alt="Logo" />
              <span class="text-medium text-thin text-uppercase text-wide">Dashboard</span>
            </router-link>
        </div>
        <div class="nav-small-menu margin-right">
            <a class="nav-item" title="Open Menu" href="javascript:openSidebar()">
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 7h16v2H0V7zm0-6h16v2H0V1zm0 12h16v2H0v-2z" fill-rule="evenodd"></path></svg>
            </a>
        </div>
    	</div>
  </nav>
</template>

<script>
export default { }
</script>

<style>
#app-logobar.navbar {
  position: relative;
  display: block;
}
#app-logobar .nav-item-logo a {
  text-decoration: none;
  cursor: pointer;
}
#app-logobar .nav-item-logo {
  transition: all 0.5s ease;
}
#app-logobar .nav-item-logo:hover, #app-logobar .nav-item-logo:focus {
  box-shadow:inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
}
#app-logobar .dropdown-body {
  min-width: 21rem;
  left: -15.6rem;
}
#app-logobar .router-link-active, #app-logobar .router-link-exact-active {
  text-decoration: none;
}
#app-logobar .router-link-active:hover, #app-logobar .router-link-exact-active:hover {
  text-decoration: none;
}
.greyscale {
  filter: grayscale(100%);
  transition: all 0.3s ease;
}
</style>
