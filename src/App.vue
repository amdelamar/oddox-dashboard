<template>
<div id="app" class="background-solid-grey">
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
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
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
</style>
