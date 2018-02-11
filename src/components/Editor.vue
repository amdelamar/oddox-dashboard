<template>
  <div class="editor full-width">
    <div class="editor-toolbar full-width">
        <select id="fontFamily">
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Consolas">Consolas</option>
          <option value="Courier New">Courier New</option>
          <option value="Roboto">Roboto</option>
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
        <button class="button" :class="{'active':bold}" v-on:click="bold = !bold"><i class="icon-bold"></i></button>
        <button class="button"><i class="icon-italic"></i></button>
        <button class="button"><i class="icon-underline"></i></button>
        <button class="button"><i class="icon-strikethrough"></i></button>
        <span class="border-left margin-left margin-right"></span>
        <button class="button"><i class="icon-paragraph-left"></i></button>
        <button class="button"><i class="icon-paragraph-center"></i></button>
        <button class="button"><i class="icon-paragraph-right"></i></button>
        <button class="button"><i class="icon-indent-increase"></i></button>
        <button class="button"><i class="icon-indent-decrease"></i></button>
        <span class="border-left margin-left margin-right"></span>
        <button class="button"><i class="icon-list-numbered"></i></button>
        <button class="button"><i class="icon-list"></i></button>
        <button class="button"><i class="icon-table"></i></button>
        <button class="button"><i class="icon-image"></i></button>
        <button class="button"><i class="icon-link"></i></button>
        <span class="border-left margin-left margin-right"></span>
        <button class="button"><i class="icon-superscript"></i></button>
        <button class="button"><i class="icon-subscript"></i></button>
    </div>
    <textarea id="content" class="editor-textbox full-width" style="height:30rem;" v-model="content" placeholder="<p>Begin writing here...</p>"></textarea>
  </div>
</template>

<script>
export default {
  name: 'editor',
  data () {
    return {
      content: '',
      bold: false
    }
  }
}
</script>

<style>
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
