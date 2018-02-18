<template>
  <textarea name="content" class="ckeditor" :id="id" :value="value" v-on:change="updateValue($event.target.value)"></textarea>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
let index = 0
export default {
  data () {
    return {
      instance: null
    }
  },
  props: {
    value: {
      type: String,
      default: '<p>Start writing...</p>'
    },
    id: {
      type: String,
      default: 'editor-' + (index += 1)
    }
  },
  mounted () {
    ClassicEditor
      .create(this.$el, {
        toolbar: [ 'undo', 'redo', 'headings', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ]
      })
      .then(editor => {
        this.instance = editor
      })
      .catch(error => {
        console.error(error)
      })
  },
  updated () {
    this.instance.setData(this.value)
  },
  watch: {
    value: function () {
      let html = this.instance.getData()
      if (html !== this.value) {
        this.instance.setData(this.value)
      }
    }
  },
  methods: {
    updateValue: function (value) {
      console.log('value updated')
      this.$emit('input', value)
    }
  }
}
</script>

<style>
.ckeditor {
  width: 100%;
}
</style>
