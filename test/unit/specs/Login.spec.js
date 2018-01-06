import Vue from 'vue'
import Logout from '@/views/Login'

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Logout)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#login h1').textContent)
      .toEqual('Login')
  })
})
