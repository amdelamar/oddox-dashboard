import Vue from 'vue'
import Logout from '@/views/Logout'

describe('Logout.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Logout)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#logout h3').textContent)
      .toEqual('Goodbye!')
  })
})
