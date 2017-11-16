import Vue from 'vue'
import Hello from '@/components/Login'

describe('Login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#login h1').textContent)
      .to.equal('Login')
  })
})