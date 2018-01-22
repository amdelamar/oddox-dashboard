import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import posts from './modules/posts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    authentication,
    posts
  },
  strict: debug
})
