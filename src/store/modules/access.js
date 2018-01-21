import database from '../../api/database'
import * as types from '../mutation-types'
import moment from 'moment'

// initial state
const state = {
  token: localStorage.getItem('access-token') || '',
  loginError: '',
  synced: false,
  syncError: '',
  syncTime: null
}

// getters
const getters = {
  getAccessToken: state => state.token,
  isAuthenticated: state => !!state.token,
  getLoginError: state => state.loginError,
  isSynced: state => state.synced,
  getSyncError: state => state.syncError,
  getSyncTime: state => state.syncTime
}

// actions
const actions = {
  synchronize ({ commit }) {
    return new Promise((resolve, reject) => {
      database.synchronize(state.token, result => {
        commit(types.SET_IS_SYNCED, true)
        commit(types.SET_SYNC_ERROR, '')
        commit(types.SET_SYNC_TIME, moment.now())
        resolve('Sync Success.')
      }, err => {
        commit(types.SET_IS_SYNCED, false)
        commit(types.SET_SYNC_ERROR, err)
        commit(types.SET_SYNC_TIME, null)
        reject(err)
      })
    })
  },

  login ({ commit }, token) {
    return new Promise((resolve, reject) => {
      database.login(token, result => {
        localStorage.setItem('access-token', result)
        commit(types.SET_ACCESS_TOKEN, result)
        commit(types.SET_LOGIN_ERROR, '')
        resolve('Login Success.')
      }, err => {
        commit(types.SET_LOGIN_ERROR, err)
        reject(err)
      })
    })
  },

  logout ({ commit }) {
    localStorage.removeItem('access-token')
    commit(types.SET_ACCESS_TOKEN, '')
    commit(types.SET_LOGIN_ERROR, '')
  },

  destroyDatabases ({ commit }) {
    return new Promise((resolve, reject) => {
      database.destroy(result => {
        commit(types.SET_POST, null)
        commit(types.SET_POSTS, null)
        resolve('Destroy Databases Success.')
      }, err => {
        reject(err)
      })
    })
  },

  destroyEverything ({ commit }) {
    return new Promise((resolve, reject) => {
      database.destroy(result => {
        commit(types.SET_POST, null)
        commit(types.SET_POSTS, null)
        commit(types.SET_ACCESS_TOKEN, '')
        window.localStorage.clear()
        resolve('Clear LocalStorage Success.')
      }, err => {
        reject(err)
      })
    })
  },

  setAccessToken ({ commit }, token) {
    commit(types.SET_TOKEN, token)
  },
  setLoginError ({ commit }, error) {
    commit(types.SET_LOGIN_ERROR, error)
  },
  setSynced ({ commit }, bool) {
    commit(types.SET_IS_SYNCED, bool)
  },
  setSyncError ({ commit }, error) {
    commit(types.SET_SYNC_ERROR, error)
  },
  setSyncTime ({ commit }, time) {
    commit(types.SET_SYNC_TIME, time)
  }
}

// mutations
const mutations = {
  [types.SET_ACCESS_TOKEN] (state, token) {
    state.token = token
  },
  [types.SET_LOGIN_ERROR] (state, loginError) {
    state.loginError = loginError
  },
  [types.SET_IS_SYNCED] (state, synced) {
    state.synced = synced
  },
  [types.SET_SYNC_ERROR] (state, syncError) {
    state.syncError = syncError
  },
  [types.SET_SYNC_TIME] (state, syncTime) {
    state.syncTime = syncTime
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
