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
.hover-shadow:hover {
  box-shadow: 0 0 8px 5px #efefef;
}
.text-capitalize {
  text-transform: capitalize;
}
.background-solid-white {
  background-color: #ffffff;
}
.background-solid-grey {
  background-color: #fafafa;
}
.background-gradient-grey {
  background-color: unset;
  background-image: linear-gradient(180deg, #ffffff 50%, #fafafa 100%);
}
input:hover, input:active, input:focus {
  background-color: #ffffff;
}
</style>
