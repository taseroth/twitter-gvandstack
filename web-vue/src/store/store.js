import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '../services/AuthService'
import * as twitter from '@//store/modules/twitter'

Vue.use(Vuex)

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { loggedIn: true, user }
  : { loggedIn: false, user: null }

export default new Vuex.Store({
  modules: {
    twitter,
  },
  state: {
    loggedIn: initialState.loggedIn,
    user: initialState.user,
  },
  mutations: {
    REMOVE_USER_DATA(state) {
      state.loggedIn = false
      state.user = null
      localStorage.removeItem('user')
    },
    SET_USER_DATA(state, idToken) {
      console.log(idToken)
      const user = {
        jwtToken: idToken.jwtToken,
        username: idToken.payload['cognito:username'],
        email: idToken.payload['email'],
        groups: idToken.payload['cognito:groups'],
      }
      localStorage.setItem('user', JSON.stringify(user))
      state.loggedIn = true
      state.user = user
    },
  },
  actions: {
    logout({ commit }) {
      return AuthService.logout().then(() => {
        commit('REMOVE_USER_DATA')
      })
    },
    login({ commit }, credentials) {
      return AuthService.login(credentials.username, credentials.password).then(
        cognosUser => {
          commit('SET_USER_DATA', cognosUser.signInUserSession.idToken)
        }
      )
    },
  },
  getters: {
    loggedIn(state) {
      return state.loggedIn
    },
  },
})
