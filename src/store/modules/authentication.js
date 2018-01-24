import database from '../../api/database'
import * as types from '../mutation-types'
import moment from 'moment'

// initial state
const state = {
  authToken: JSON.parse(localStorage.getItem('auth-token')) || '',
  authTime: null,
  synced: false,
  syncError: '',
  syncTime: null
}

// getters
const getters = {
  getAuthToken: state => state.authToken,
  isAuthenticated: state => !!state.authToken,
  getAuthTime: state => state.authTime,
  isSynced: state => state.synced,
  getSyncError: state => state.syncError,
  getSyncTime: state => state.syncTime
}

// actions
const actions = {
  synchronize ({ commit }) {
    return new Promise((resolve, reject) => {
      database.synchronize(state.authToken, result => {
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
        localStorage.setItem('auth-token', JSON.stringify(result))
        commit(types.SET_AUTH_TOKEN, result)
        commit(types.SET_AUTH_TIME, moment.now())
        resolve('Login Success.')
      }, err => {
        reject(err)
      })
    })
  },

  logout ({ commit }) {
    localStorage.removeItem('auth-token')
    commit(types.SET_AUTH_TOKEN, '')
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
        commit(types.SET_AUTH_TOKEN, '')
        window.localStorage.clear()
        resolve('Clear LocalStorage Success.')
      }, err => {
        reject(err)
      })
    })
  },

  setSyncError ({ commit }, error) {
    commit(types.SET_SYNC_ERROR, error)
  }
}

// mutations
const mutations = {
  [types.SET_AUTH_TOKEN] (state, authToken) {
    state.authToken = authToken
  },
  [types.SET_AUTH_TIME] (state, authTime) {
    state.authTime = authTime
  },
  [types.SET_IS_SYNCED] (state, isSynced) {
    state.synced = isSynced
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
