<template>
<div class="full-height">

  <div class="contextbar padding border-bottom background-solid-grey">
    <div class="text-right">
      <button class="button" onclick="#save">Save</button>&nbsp;
      <button class="button button-blue" onclick="#publish">Publish</button>&nbsp;
      <button class="button button-red" onclick="#delete">Delete</button>
    </div>
  </div>

  <div id="content" class="padding-large scrollable background-solid-white animated fadeIn">
    <p class="margin-none text-right">
      <code v-for="tag in post.tags">{{ tag }}</code>
      &nbsp;|&nbsp;
      {{ post.date }}
    </p>
    <h1>{{ post.title }}</h1>
    <p v-bind="post.content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet lobortis tortor ut aliquet. Sed vitae feugiat odio, nec suscipit orci. Pellentesque vitae gravida enim. Maecenas aliquet pharetra urna non mollis. Maecenas ac erat ante. Suspendisse
      dapibus suscipit diam, quis dictum neque tristique varius. Aenean eu turpis non lorem condimentum tincidunt nec in purus. Fusce et dolor sit amet nibh sagittis bibendum. Pellentesque quis est lacinia, cursus urna eu, pharetra elit. Phasellus non
      elit vestibulum, porttitor neque aliquam, rutrum erat. Quisque tempus nisi felis, sed interdum nulla lobortis quis. Suspendisse potenti. Vivamus non augue sem. Etiam in vestibulum tellus. Donec mattis risus ligula, ac euismod purus malesuada eget.
      Cras interdum lobortis nisi, sit amet ultricies odio malesuada non.
      <br/><br/> Aliquam lobortis purus quis orci dapibus bibendum at at libero. Duis nec maximus nulla. Mauris eget erat vel nibh aliquet porta. Suspendisse sed facilisis tellus, eget auctor nunc. Integer faucibus dolor non metus sollicitudin cursus.
      In hac habitasse platea dictumst. Praesent sit amet libero ac tellus imperdiet lacinia nec ultrices neque. Curabitur dapibus euismod elit, eu imperdiet eros pharetra vel. Vivamus nec elit quis velit fringilla tincidunt. Cras in imperdiet est. Donec
      consequat aliquam orci, vel mattis ex tempus id. Integer elementum metus eros, eu bibendum ipsum euismod nec. Aliquam erat volutpat.
      <br/><br/> Suspendisse maximus facilisis tortor, vitae commodo lacus consequat ut. Vivamus efficitur porta sem, non molestie elit posuere eu. Maecenas tristique quam eget fringilla sodales. Praesent pulvinar turpis a pellentesque scelerisque. In
      feugiat sagittis porttitor. Aliquam rutrum justo pharetra felis posuere, nec cursus purus commodo. Cras non nisi sit amet velit tristique tempor ac id justo. Duis pulvinar tincidunt ipsum, id condimentum massa tempor non.
      <br/><br/> Nullam lacus leo, molestie et facilisis in, dictum condimentum dolor. Donec ligula diam, egestas vitae dui vitae, accumsan facilisis lacus. Sed facilisis turpis eu fringilla scelerisque. Praesent nec est ut tellus ultrices feugiat ut
      vitae nisl. Pellentesque leo tellus, molestie ut facilisis nec, interdum non lectus. Nulla sed magna neque. Cras pulvinar mauris at lacus congue, nec condimentum ipsum porta. Phasellus eu feugiat mi, vitae fermentum neque. Quisque consequat fringilla
      ipsum sed iaculis.
      <br/><br/> Fusce dui augue, fringilla vel laoreet eget, molestie eu quam. Curabitur malesuada eros sit amet orci blandit, vitae aliquam mi elementum. In vehicula justo sed mollis dignissim. Duis nisl ex, molestie non facilisis vel, fringilla id
      felis. Vivamus congue id ligula vitae venenatis. Quisque tempus erat nisi, ut varius ipsum tempus et. Praesent in leo justo. Suspendisse lorem orci, fringilla at ligula id, aliquam volutpat quam. Mauris ornare, libero non sagittis tincidunt, risus
      eros porta nisi, nec convallis massa justo a ipsum. Nullam condimentum fringilla nunc, non ultricies erat lobortis quis. Curabitur condimentum sem vitae mauris malesuada, in convallis tortor consectetur. Ut ullamcorper justo sit amet enim elementum,
      eget tempor justo porttitor. Phasellus mollis dapibus augue sed bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse elementum ante sit amet mollis convallis.
      <br/><br/> In euismod urna eu magna finibus molestie. Phasellus luctus urna ac magna posuere tristique. Suspendisse magna tortor, blandit quis eleifend in, pretium bibendum enim. Pellentesque ut est ultrices lectus viverra gravida vitae quis ex.
      Phasellus eget ornare tellus. Praesent quis pellentesque nulla. Sed ut dui nulla. Donec cursus, nisl vitae cursus porta, quam ipsum ultricies neque, in semper nisi urna quis mauris. Aenean eget metus tellus. Aenean eu posuere metus. Mauris sem arcu,
      eleifend eu varius non, iaculis non orci. Cras sit amet odio ipsum.
      <br/><br/> Nulla ornare maximus nisi. Integer dignissim pellentesque turpis, id ultricies urna fringilla eu. Vivamus nec tellus ut erat finibus malesuada. Suspendisse nec urna consectetur massa aliquet placerat. Integer mattis nisi id tellus dictum
      mollis. Ut eu justo non orci condimentum accumsan. Cras molestie finibus tempor. In finibus nisi eget tortor suscipit vulputate. Nulla facilisi. Cras interdum consequat augue a commodo. Morbi posuere nisl eget posuere gravida. Aenean laoreet ligula
      ac lacus lobortis tincidunt.
      <br/><br/> Aliquam sed justo tincidunt, gravida dolor at, sagittis elit. Etiam quis neque maximus, eleifend purus ut, tempus nulla. Aenean fringilla placerat tortor, et pharetra enim dignissim sit amet. Suspendisse potenti. Sed vestibulum porta
      nunc vel accumsan. Aliquam magna neque, maximus non enim ac, finibus mattis mi. Aenean tristique tincidunt ante quis ultricies. Sed ac ultrices dolor. Nam pulvinar quam et iaculis ultrices.
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
      post: {
        title: 'Hello World!',
        tags: ['first', 'test'],
        date: '' + new Date().toLocaleString()
      }
    }
  }
}
</script>

<style>
#content {
  height: calc(100% - 6.5rem);
}
</style>
