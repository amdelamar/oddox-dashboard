import database from '../../api/database'
import * as types from '../mutation-types'

// initial state
const state = {
  status: null
}

// getters
const getters = {
  getStatus: state => state.status
}

// actions
const actions = {
  synchronize ({ commit }) {
    database.synchronize(status => {
      commit(types.SYNC, { status })
    })
  },

  clearLocalStorage () {
    window.localStorage.clear()
  }
}

// mutations
const mutations = {
  [types.SYNC] (state, { status }) {
    state.status = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
