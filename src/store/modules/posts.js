import database from '../../api/database'
import * as types from '../mutation-types'

// initial state
const state = {
  posts: []
}

// getters
const getters = {
  allPosts: state => state.posts
}

// actions
const actions = {
  allPosts ({ commit }) {
    database.allPosts(posts => {
      console.log('all posts count ' + posts.length)
      commit(types.SET_POSTS, { posts })
    })
  }
}

// mutations
const mutations = {
  [types.SET_POSTS] (state, { posts }) {
    state.posts = posts
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
