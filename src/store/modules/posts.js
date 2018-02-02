import database from '../../api/database'
import * as types from '../mutation-types'

// initial state
const state = {
  post: null,
  posts: null
}

// getters
const getters = {
  getAllPosts: state => state.posts,
  getCurrentPost: state => state.post
}

// actions
const actions = {

  searchPosts ({ commit }, text) {
    return new Promise((resolve, reject) => {
      database.searchPosts(text, posts => {
        commit(types.SET_POSTS, posts)
        resolve()
      }, err => {
        commit(types.SET_POSTS, null)
        reject(err)
      })
    })
  },

  searchAllPosts ({ commit }, text) {
    return new Promise((resolve, reject) => {
      database.searchAllPosts(text, posts => {
        commit(types.SET_POSTS, posts)
        resolve()
      }, err => {
        commit(types.SET_POSTS, null)
        reject(err)
      })
    })
  },

  searchDrafts ({ commit }, text) {
    return new Promise((resolve, reject) => {
      database.searchDrafts(text, posts => {
        commit(types.SET_POSTS, posts)
        resolve()
      }, err => {
        commit(types.SET_POSTS, null)
        reject(err)
      })
    })
  },

  searchFeatured ({ commit }, text) {
    return new Promise((resolve, reject) => {
      database.searchFeatured(text, posts => {
        commit(types.SET_POSTS, posts)
        resolve()
      }, err => {
        commit(types.SET_POSTS, null)
        reject(err)
      })
    })
  },

  searchTrash ({ commit }, text) {
    return new Promise((resolve, reject) => {
      database.searchTrash(text, posts => {
        commit(types.SET_POSTS, posts)
        resolve()
      }, err => {
        commit(types.SET_POSTS, null)
        reject(err)
      })
    })
  },

  setCurrentPost ({ commit }, id) {
    return new Promise((resolve, reject) => {
      if (id === null) {
        commit(types.SET_POST, null)
        resolve()
      } else {
        database.readPost(id, post => {
          commit(types.SET_POST, post)
          resolve()
        }, err => {
          commit(types.SET_POST, null)
          reject(err)
        })
      }
    })
  },

  updatePost ({ commit }, data) {
    return new Promise((resolve, reject) => {
      database.updatePost(data, post => {
        resolve(post)
      }, err => {
        reject(err)
      })
    })
  },

  deletePost ({ commit }, data) {
    return new Promise((resolve, reject) => {
      database.deletePost(data, post => {
        commit(types.SET_POST, null)
        resolve()
      }, err => {
        reject(err)
      })
    })
  }

}

// mutations
const mutations = {
  [types.SET_POSTS] (state, posts) {
    state.posts = posts
  },
  [types.SET_POST] (state, post) {
    state.post = post
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
