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
  width: 26%;
  margin: 0;
}
.main-content {
  width: 60.6666666667%;
  margin: 0;
}
.full-main-content {
  width: 86.6666666667%;
  margin: 0;
}
.text-red {
  color: var(--red);
}
.text-green {
  color: var(--green);
}
.text-white {
  color: var(--white);
}
.text-theme {
  color: #67d9b8;
}
.button {
  transition: all 0.1s ease;
}
.button-small {
  font-size: .75em;
  height: 3rem;
  padding: 0 1em;
  line-height: 2.8rem;
}
.super-center {
  position: relative;
  width: 200px;
  height: 50px;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -100px;
}
input:hover, input:active, input:focus {
  background-color: var(--white);
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
.background-solid-theme, hover-background-solid-theme:hover {
  background-color: #67d9b8;
}
.background-transparent { background: transparent; }
.text-capitalize { text-transform: capitalize; }
.text-lightgrey { color: #fafafa; }
.text-grey { color: #d3d3d3; }
.text-darkgrey { color: #8c8c8c; }

.background-solid-white, .hover-background-solid-white:hover {
  background-color: var(--white);
}
.background-solid-lightgrey, .hover-background-solid-lightgrey:hover {
  background-color: #fafafa;
}
.background-solid-grey, .hover-background-solid-grey:hover {
  background-color: #d3d3d3;
}
.background-solid-darkgrey, .hover-background-solid-darkgrey:hover {
  background-color: #8c8c8c;
}
.background-gradient-grey, .hover-background-gradient-grey:hover {
  background-color: unset;
  background-image: linear-gradient(180deg, var(--white) 50%, #fafafa 100%);
}

.button-blue-outline { background: transparent; color: var(--blue); }
.button-red-outline { background: transparent; color: var(--red); }
.button-green-outline { background: transparent; color: var(--green); }

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
.tabs {
  padding: 0;
  margin: auto;
  align-items: flex-end;
  height: 100%;
  min-height: 6.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.tabs .tab {
  background: transparent;
  border: 1px solid var(--grey);
  border-bottom: unset;
  border-right: unset;
  margin: 0;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.tabs .tab:last-child {
  border-right: 1px solid var(--grey);
}
.tabs .tab:hover {
  background: var(--white) !important;
}
.tabs .tab.router-link-exact-active, .tabs .tab.active {
  background: var(--white);
}
.editor {
  display: inline-block;
  min-height: 9rem;
  border-radius: .4rem;
  border: 1px solid;
  border-color: var(--grey);
}
.editor .editor-toolbar {
  display: inline-block;
  padding: 1rem;
  background-color: var(--light-grey);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  border-bottom: 1px solid;
  border-color: var(--grey);
}
.editor .editor-toolbar select {
  height: 3rem;
  min-width: 1.5rem;
  margin: 0 .4rem 0 0;
  padding: 0;
}
.editor .editor-toolbar .button {
  height: 3rem;
  line-height: inherit;
  letter-spacing: normal;
  text-decoration: none;
  color: var(--black);
  font-size: 1.5rem;
  margin: .4rem 0;
  padding: 0 .8rem;
  border-color: var(--grey);
}
.editor .editor-toolbar .button:hover, .editor .editor-toolbar .button.active:hover {
  color: var(--white);
  background-color: var(--blue);
  border-color: var(--blue);
}
.editor .editor-toolbar .button.active {
  color: var(--black);
  background-color: var(--grey);
}
.editor .editor-textbox {
  display: inline-block;
  min-height: 4rem;
  border: none;
  margin: .1rem;
}
</style>
