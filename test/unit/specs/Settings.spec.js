import Vue from 'vue'
import Settings from '@/views/Settings'

describe('Settings.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Settings)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#settings h1').textContent)
      .toEqual('Settings')
  })
})
