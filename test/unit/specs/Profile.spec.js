import Vue from 'vue'
import Profile from '@/views/Profile'

describe('Profile.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Profile)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#profile h1').textContent)
      .toEqual('My Profile')
  })
})
