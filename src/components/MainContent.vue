<template>
<div id="app-main-content" class="row">

  <div class="contextbar row padding border-bottom">
    <div class="text-right">
      <button class="button" onclick="#save">Save</button>&nbsp;
      <button class="button button-blue" onclick="#publish">Publish</button>&nbsp;
      <button class="button button-red" onclick="#delete">Delete</button>
    </div>
  </div>

  <div class="row full-height padding-large scrollable animated fadeIn">
    <h1 id="post-title">{{ title }}</h1>
    <p id="post-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere risus urna, lobortis semper est iaculis eu. In maximus rutrum dolor ac ullamcorper. Fusce id consectetur odio. Etiam finibus urna ullamcorper, ultricies lectus nec, imperdiet est.
      Curabitur nec justo vel urna finibus mattis aliquam ut enim. Donec posuere lectus sed arcu sodales, vel commodo felis placerat. Vestibulum eu sem eu mauris pharetra porttitor.
      <br/><br/> Ut ullamcorper id augue non tempor. Fusce porttitor tellus ut sapien eleifend placerat. Etiam at facilisis risus, eu ultricies risus. Pellentesque metus enim, mattis ac consectetur et, laoreet a turpis. Nam placerat pulvinar fringilla.
      Etiam sed dui blandit, molestie diam non, viverra neque. Phasellus id aliquet lorem. In mi lectus, venenatis et luctus sit amet, laoreet a justo. Etiam id leo id libero scelerisque pretium maximus nec odio. Aenean ex risus, efficitur eget diam ac,
      auctor bibendum lacus. Maecenas vehicula finibus pellentesque. Curabitur dapibus, nibh sed placerat faucibus, nisi velit condimentum magna, a accumsan ligula ipsum vel diam. Sed nulla risus, congue vitae commodo at, ultrices a odio. Integer consectetur
      risus ligula, vitae sodales elit scelerisque et. Maecenas nec euismod elit. Fusce fringilla, felis id suscipit lacinia, lacus diam imperdiet justo, non mollis urna neque non mauris.
      <br/><br/> Quisque viverra laoreet convallis. Donec ultricies nisi leo, vitae mattis lacus molestie et. Nam gravida venenatis vulputate. Nulla facilisi. Fusce at rutrum libero. Ut suscipit tempor neque, quis auctor augue finibus ut. Fusce volutpat
      dui scelerisque cursus bibendum. Nam vitae sapien leo.
      <br/><br/> Phasellus varius tellus nulla, vitae viverra odio finibus et. Fusce at porttitor lectus, id consequat lorem. Donec placerat iaculis leo quis lacinia. Morbi venenatis tincidunt est, eu condimentum felis auctor nec. Nulla facilisi. Donec
      rutrum venenatis porttitor. Maecenas vel blandit risus.
      <br/><br/> Vestibulum lacinia pharetra arcu tincidunt venenatis. Phasellus vitae tempor lectus, at accumsan velit. Etiam convallis iaculis ligula id lobortis. In nec erat convallis mauris cursus fringilla. Mauris sit amet mattis tortor. Integer
      finibus est a ex pharetra, non tempus nisl commodo. Suspendisse in blandit nulla. Nulla facilisi. In elementum nibh sit amet tincidunt volutpat.
    </p>
  </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'app-main-content',
  data () {
    return {
      title: 'Hello World!',
      username: 'amdelamar',
      date: '' + new Date().toLocaleString()
    }
  }
}
</script>

<style>
#app-main-content {
  height: 100%;
}
</style>
