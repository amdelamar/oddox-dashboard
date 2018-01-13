import database from '../../api/database'
import * as types from '../mutation-types'

// initial state
const state = {
  post: null,
  posts: null
}

// getters
const getters = {
  allPosts: state => state.posts,
  currentPost: state => state.post
}

// actions
const actions = {

  allPosts ({ commit }) {
    database.allPosts(posts => {
      console.log('all posts count ' + posts.length)
      commit(types.SET_POSTS, { posts })
    })
  },

  openPost ({ commit }, id) {
    database.readPost(id, post => {
      console.log('open post: ' + post._id)
      commit(types.SET_POST, { post })
    }, err => {
      console.log('Error: ' + err)
      commit(types.SET_POST, null)
    })
  },

  closePost ({ commit }) {
    commit(types.SET_POST, null)
  },

  updatePost ({ commit }, data) {
    database.updatePost(data, post => {
      console.log('updated post: ' + post.title)
      commit(types.SET_POST, { post })
    }, err => {
      console.log('Error: ' + err)
    })
  }

}

// mutations
const mutations = {
  [types.SET_POSTS] (state, { posts }) {
    state.posts = posts
  },
  [types.SET_POST] (state, { post }) {
    state.post = post
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
