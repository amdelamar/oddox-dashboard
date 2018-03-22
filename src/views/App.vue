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
  background-color: #fafafa;
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
.button:hover {
  opacity: 1 !important;
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.1);
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
  overflow-y: scroll;
  overflow-x: hidden;
}
.scollable-none {
  overflow-y: hidden;
  overflow-x: hidden;
}
.overflow-none {
  overflow: none;
}
.full-height {
  height: 100%;
}
input:hover, input:active, input:focus {
  background-color: var(--white);
}
.shadow, .hover-shadow:hover {
  box-shadow: 0 4px 4px 0 rgba(0,0,0,0.15);
}
.shadow-outline, .hover-shadow-outline:hover {
  box-shadow: 0 0 4px 1px rgba(0,0,0,0.15);
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
.background-transparent { background: transparent !important; }
.text-capitalize { text-transform: capitalize; }
.text-lightgrey { color: #fafafa; }
.text-grey { color: #d3d3d3; }
.text-darkgrey { color: #8c8c8c; }

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
