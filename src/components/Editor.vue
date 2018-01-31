<template>
  <div class="editor">

    <div class="toolbar border-left border-top border-right">
      <div class="settings ten columns padding text-left">
        <select id="fontFamily">
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
        <select id="fontSize">
          <option value="8pt">8pt</option>
          <option value="10pt">10pt</option>
          <option value="12pt">12pt</option>
          <option value="14pt">14pt</option>
          <option value="16pt">16pt</option>
          <option value="18pt">18pt</option>
          <option value="24pt">24pt</option>
          <option value="36pt">36pt</option>
          <option value="48pt">48pt</option>
          <option value="64pt">64pt</option>
          <option value="72pt">72pt</option>
        </select>
        <span class="border-left margin-left margin-right"></span>

        <button class="button"><i class="icon-bold"></i></button>
        <button class="button"><i class="icon-italic"></i></button>
        <button class="button"><i class="icon-underline"></i></button>
        <button class="button"><i class="icon-strikethrough"></i></button>
        <span class="border-left margin-left margin-right"></span>

        <button class="button"><i class="icon-table"></i></button>
        <button class="button"><i class="icon-image"></i></button>
        <button class="button"><i class="icon-link"></i></button>
        <button class="button"><i class="icon-spell-check"></i></button>
        <span class="border-left margin-left margin-right"></span>

        <button class="button"><i class="icon-superscript"></i></button>
        <button class="button"><i class="icon-subscript"></i></button>
      </div>
      <div class="tabs">
        <button class="tab button button-small" v-bind:class="{ 'active': tab == 0 }" v-on:click="setTab(0)"><i class="icon-file-text2"></i></button>
        <button class="tab button button-small" v-bind:class="{ 'active': tab == 1 }" v-on:click="setTab(1)"><i class="icon-embed2"></i></button>
      </div>
    </div>

    <div v-if="tab == 0" v-html="newText" class="textview border-top padding"></div>
    <textarea v-if="tab == 1" class="textbox full-height full-width margin-none" v-model="newText" placeholder="<p>Begin writing here...</p>"></textarea>

  </div>
</template>

<script>
export default {
  name: 'editor',
  data () {
    return {
      newText: this.text.length > 0 ? this.text : '<p>Begin writing here...</p>',
      tab: 0
    }
  },
  props: {
    text: ''
  },
  methods: {
    setTab (tabIndex) {
      this.tab = tabIndex
    }
  }
}
</script>

<style>
.editor {
  display: inline-block;
  min-height: 9rem;
  border-radius: .4rem;
}
.editor .toolbar {
  display: inline-block;
  height: 5rem;
  width: 100%;
  background-color: var(--light-grey);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.editor .toolbar .tabs {
  position: relative;
  right: 0;
  bottom: 0;
  height: 100%;
  min-height: unset;
}
.editor .toolbar .settings select {
  height: 3rem;
  min-width: 1.5rem;
  margin: 0 .4rem 0 0;
  padding: 0;
}
.editor .toolbar .settings button {
  height: 3rem;
  line-height: inherit;
  letter-spacing: normal;
  text-decoration: none;
  color: var(--black);
  font-size: 1.5rem;
  margin: 0;
  padding: 0 .8rem;
  border-color: var(--grey);
}
.editor .toolbar .settings button:hover {
  color: var(--white);
  background-color: var(--blue);
  border-color: var(--blue);
}
.editor .textbox {
  display: inline-block;
  height: calc(100% - 5rem);
  min-height: 4rem;
  width: 100%;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.editor .textview {
  display: inline-block;
  height: calc(100% - 5rem);
  min-height: 4rem;
  width: 100%;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
</style>
