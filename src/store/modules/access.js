import database from '../../api/database'
import * as types from '../mutation-types'
import moment from 'moment'

// initial state
const state = {
  access: {
    url: '',
    username: '',
    password: ''
  },
  loggedIn: false,
  loginError: '',
  synced: false,
  syncError: '',
  syncTime: null
}

// getters
const getters = {
  getAccess: state => state.access,
  isLoggedIn: state => state.loggedIn,
  getLoginError: state => state.loginError,
  isSynced: state => state.synced,
  getSyncError: state => state.syncError,
  getSyncTime: state => state.syncTime
}

// actions
const actions = {
  synchronize ({ commit }) {
    return new Promise((resolve, reject) => {
      database.synchronize(state.access, result => {
        commit(types.SET_IS_SYNCED, true)
        commit(types.SET_SYNC_ERROR, '')
        commit(types.SET_SYNC_TIME, moment.now())
        resolve('Success!')
      }, err => {
        commit(types.SET_IS_SYNCED, false)
        commit(types.SET_SYNC_ERROR, err)
        commit(types.SET_SYNC_TIME, null)
        reject(err)
      })
    })
  },

  login ({ commit }, access) {
    return new Promise((resolve, reject) => {
      database.login(access, result => {
        commit(types.SET_ACCESS, result)
        commit(types.SET_IS_LOGGED_IN, true)
        commit(types.SET_LOGIN_ERROR, '')
        resolve('Success!')
      }, err => {
        commit(types.SET_LOGIN_ERROR, err)
        commit(types.SET_IS_LOGGED_IN, false)
        reject(err)
      })
    })
  },

  clearLocalStorage ({ commit }) {
    database.destroy(result => {
      commit(types.SET_ACCESS, {
        url: '',
        username: '',
        password: '' })
      commit(types.SET_IS_LOGGED_IN, false)
      commit(types.SET_LOGIN_ERROR, '')
      window.localStorage.clear()
    })
  },

  setLoggedIn ({ commit }, bool) {
    commit(types.SET_IS_LOGGED_IN, bool)
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
  [types.SET_ACCESS] (state, access) {
    state.access = access
  },
  [types.SET_IS_LOGGED_IN] (state, loggedIn) {
    state.loggedIn = loggedIn
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
