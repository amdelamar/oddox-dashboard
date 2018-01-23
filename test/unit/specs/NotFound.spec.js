import Vue from 'vue'
import NotFound from '@/views/error/404'

describe('404.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(NotFound)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#not-found h4').textContent)
      .toEqual('404 Not Found')
  })
})
