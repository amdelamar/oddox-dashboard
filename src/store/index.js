import Vue from 'vue'
import Vuex from 'vuex'
import access from './modules/access'
import posts from './modules/posts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    access,
    posts
  },
  strict: debug
})
