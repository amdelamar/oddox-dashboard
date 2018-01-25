import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './modules/authentication'
import authors from './modules/authors'
import posts from './modules/posts'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    authentication,
    authors,
    posts,
    settings
  },
  strict: debug
})
