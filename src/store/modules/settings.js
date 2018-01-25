import database from '../../api/database'
import * as types from '../mutation-types'

// initial state
const state = {
  appConfig: null,
  appFirewall: null
}

// getters
const getters = {
  getAppConfig: state => state.appConfig,
  getAppFirewall: state => state.appFirewall
}

// actions
const actions = {

  loadAppConfig ({ commit }) {
    return new Promise((resolve, reject) => {
      database.readAppDoc('APPCONFIG', result => {
        commit(types.SET_APPCONFIG, result)
        resolve()
      }, err => {
        commit(types.SET_APPCONFIG, null)
        reject(err)
      })
    })
  },

  loadAppFirewall ({ commit }) {
    return new Promise((resolve, reject) => {
      database.readAppDoc('APPFIREWALL', result => {
        commit(types.SET_APPFIREWALL, result)
        resolve()
      }, err => {
        commit(types.SET_APPFIREWALL, null)
        reject(err)
      })
    })
  },

  updateAppConfig ({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (data === null) {
        reject(new Error('Cannot delete app config.'))
      } else {
        database.updateAppDoc('APPCONFIG', result => {
          commit(types.SET_APPCONFIG, result)
          resolve()
        }, err => {
          commit(types.SET_APPCONFIG, null)
          reject(err)
        })
      }
    })
  },

  updateAppFirewall ({ commit }, data) {
    return new Promise((resolve, reject) => {
      if (data === null) {
        reject(new Error('Cannot delete app firewall.'))
      } else {
        database.updateAppDoc('APPFIREWALL', result => {
          commit(types.SET_APPFIREWALL, result)
          resolve()
        }, err => {
          commit(types.SET_APPFIREWALL, null)
          reject(err)
        })
      }
    })
  }

}

// mutations
const mutations = {
  [types.SET_APPCONFIG] (state, appConfig) {
    state.appConfig = appConfig
  },
  [types.SET_APPFIREWALL] (state, appFirewall) {
    state.appFirewall = appFirewall
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
