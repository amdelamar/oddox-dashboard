import database from '../../api/database'
import base64 from '../../api/base64'
import * as types from '../mutation-types'
import moment from 'moment'

const loadAuthToken = () => {
  // get token from LocalStorage
  if (localStorage.getItem('auth-token')) {
    return JSON.parse(base64.decode(JSON.parse(localStorage.getItem('auth-token'))))
  }
  // otherwise return empty
  return ''
}

// initial state
const state = {
  initialized: false,
  authToken: loadAuthToken(),
  authTime: null,
  synced: false,
  syncError: '',
  syncTime: ''
}

// getters
const getters = {
  isInitialized: state => state.initialized,
  getAuthToken: state => state.authToken,
  isAuthenticated: state => !!state.authToken,
  getAuthTime: state => state.authTime,
  isSynced: state => state.synced,
  getSyncError: state => state.syncError,
  getSyncTime: state => state.syncTime
}

// actions
const actions = {
  initialize ({ commit }) {
    return new Promise((resolve, reject) => {
      // Create local databases.
      database.init(state.authToken, result => {
        commit(types.SET_IS_INIT, true)
        resolve('Local databases initialized: ' + state.authToken.uid)
      }, err => {
        commit(types.SET_IS_INIT, false)
        reject(err)
      })
    })
  },

  synchronize ({ commit }) {
    return new Promise((resolve, reject) => {
      // Sync local with remote databases
      database.synchronize(state.authToken, result => {
        commit(types.SET_IS_SYNCED, true)
        commit(types.SET_SYNC_ERROR, '')
        commit(types.SET_SYNC_TIME, moment.now())
        resolve('Sync Success.')
      }, err => {
        commit(types.SET_IS_SYNCED, false)
        commit(types.SET_SYNC_ERROR, err)
        commit(types.SET_SYNC_TIME, '')
        reject(err)
      })
    })
  },

  login ({ commit }, token) {
    return new Promise((resolve, reject) => {
      // Try to login to remote database
      database.login(token, result => {
        // base64 and save to storage
        commit(types.SET_AUTH_TOKEN, result)
        localStorage.setItem('auth-token', JSON.stringify(base64.encode(JSON.stringify(result))))
        commit(types.SET_AUTH_TIME, moment.now())
        resolve('Login Success.')
      }, err => {
        reject(err)
      })
    })
  },

  logout ({ commit }) {
    // Only remove token. Don't destroy databases.
    localStorage.removeItem('auth-token')
    commit(types.SET_AUTH_TOKEN, '')
  },

  destroyDatabases ({ commit }) {
    return new Promise((resolve, reject) => {
      // Permanently destroy local databases
      database.destroy(result => {
        commit(types.SET_POST, null)
        commit(types.SET_POSTS, null)
        resolve('Destroyed all local databases.')
      }, err => {
        reject(err)
      })
    })
  },

  destroyEverything ({ commit }) {
    return new Promise((resolve, reject) => {
      // Destroy storage and state values
      database.destroy(result => {
        commit(types.SET_POST, null)
        commit(types.SET_POSTS, null)
        commit(types.SET_AUTH_TOKEN, '')
        window.localStorage.clear()
        resolve('LocalStorage destroyed.')
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
  [types.SET_IS_INIT] (state, initialized) {
    state.initialized = initialized
  },
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
