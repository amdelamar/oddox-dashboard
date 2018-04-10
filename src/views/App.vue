<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
:root {
  --primary:rgb(103,217,184); /*#67d9b8*/
}
#app {
  height: 100%;
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding: 0;
}
@media (max-width:550px){
  #app {
    overflow: auto;
  }
}
#main {
  height: calc(100% - 6.5rem);
  width: 100%;
}
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  align-items: center;
  align-content: center;
  background-color: #fafafa !important;
}
.contextbar {
  min-height: 6.5rem;
  width: 100%;
}
.side-content {
  width: 26% !important;
  margin: 0 !important;
}
.main-content {
  width: 60.6666666667% !important;
  margin: 0 !important;
}
.full-main-content {
  width: 86.6666666667% !important;
  margin: 0 !important;
}
.text-white {
  color: var(--white) !important;
}
.button {
  transition: all 0.1s ease;
}
.super-center {
  position: relative;
  width: 200px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -100px;
}
.scrollable {
  overflow-y: auto;
  overflow-x: auto;
}
.scroll-y {
  overflow-y: scroll;
}
.scroll-x {
  overflow-x: scroll;
}
.overflow-hidden {
  overflow: hidden;
}
.overflow-none {
  overflow: none;
}

input[type="email"]:active,input[type="number"]:active,input[type="search"]:active,input[type="text"]:active,input[type="tel"]:active,input[type="url"]:active,input[type="password"]:active,input[type="date"]:active,input[type="time"]:active,textarea:active,select:active,
input[type="email"]:focus,input[type="number"]:focus,input[type="search"]:focus,input[type="text"]:focus,input[type="tel"]:focus,input[type="url"]:focus,input[type="password"]:focus,input[type="date"]:focus,input[type="time"]:focus,textarea:focus,select:focus,
input[type="email"]:hover,input[type="number"]:hover,input[type="search"]:hover,input[type="text"]:hover,input[type="tel"]:hover,input[type="url"]:hover,input[type="password"]:hover,input[type="date"]:hover,input[type="time"]:hover,textarea:hover,select:hover{
  background-color: var(--white) !important;
}

.shadow, .hover-shadow:hover {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.15) !important;
}
.shadow-outline, .hover-shadow-outline:hover {
  box-shadow: 0 0 4px 1px rgba(0,0,0,0.15) !important;
}

.dialog {
  /* display: none; */
  z-index: 1;
  position: fixed;
  width: 400px;
  height: 250px;
  top: 50%;
  left: 50%;
  margin: -125px 0 0 -200px;
}

.text-lightgrey { color: #fafafa; }
.text-grey { color: #d3d3d3; }
.text-darkgrey { color: #8c8c8c; }
.background-transparent { background: transparent !important; }
.background-white, .hover-background-white:hover {
  background-color: var(--white) !important;
}
.background-lightgrey, .hover-background-lightgrey:hover {
  background-color: #fafafa !important;
}
.background-grey, .hover-background-grey:hover {
  background-color: #d3d3d3 !important;
}
.background-darkgrey, .hover-background-darkgrey:hover {
  background-color: #8c8c8c !important;
}
.background-gradient-grey, .hover-background-gradient-grey:hover {
  background-color: unset !important;
  background-image: linear-gradient(180deg, var(--white) 50%, #fafafa 100%) !important;
}

.animated.spin {
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.animated.rewind {
  animation-name: rewind;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@-moz-keyframes spin {
  from {-moz-transform:rotate(0deg);}
  to { -moz-transform:rotate(360deg); }
}
@-webkit-keyframes spin {
  from {-webkit-transform:rotate(0deg);}
  to {-webkit-transform:rotate(360deg);}
}
@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}
@-moz-keyframes rewind {
  from {-moz-transform:rotate(360deg);}
  to { -moz-transform:rotate(0deg); }
}
@-webkit-keyframes rewind {
  from {-webkit-transform:rotate(360deg);}
  to {-webkit-transform:rotate(0deg);}
}
@keyframes rewind {
  from {transform:rotate(360deg);}
  to {transform:rotate(0deg);}
}
i.animated.spin, span.animated.spin, i.animated.rewind, span.animated.rewind {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  height: 16px !important;
  width: 16px !important;
}
.tabs .tab.router-link-exact-active, .tabs .tab.active {
  background: var(--white);
}
</style>
