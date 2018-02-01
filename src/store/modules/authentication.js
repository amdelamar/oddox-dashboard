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
  syncTime: null
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
      // create unique identifier
      let uid = base64.encode(state.authToken.url)
      // create local databases
      database.init(uid, result => {
        commit(types.SET_IS_INIT, true)
        resolve('Local databases initialized: ' + uid)
      }, err => {
        reject(err)
      })
    })
  },

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
        // base and save to storage
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
