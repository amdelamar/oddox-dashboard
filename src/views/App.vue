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
.scrollable {
  overflow-y: scroll;
  overflow-x: hidden;
}
.full-height {
  height: 100%;
}
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
html, body {
  height: 100%;
  width: 100%;
}
.shadow, .hover-shadow:hover {
  box-shadow: 0 0 8px 5px #efefef;
}
.dropdown-body {
  font-size: initial;
  font-weight: initial;
  line-height: initial;
  letter-spacing: initial;
  text-transform: initial;
}
.text-capitalize {
  text-transform: capitalize;
}
.background-solid-white, .hover-background-solid-white:hover {
  background-color: #ffffff;
}
.background-solid-grey, .hover-background-solid-grey:hover {
  background-color: #fafafa;
}
.background-solid-darkgrey, .hover-background-solid-darkgrey:hover {
  background-color: #d3d3d3;
}
.background-gradient-grey, .hover-background-gradient-grey:hover {
  background-color: unset;
  background-image: linear-gradient(180deg, #ffffff 50%, #fafafa 100%);
}
input:hover, input:active, input:focus {
  background-color: #ffffff;
}
</style>
