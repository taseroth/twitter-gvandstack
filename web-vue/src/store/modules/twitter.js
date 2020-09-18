import TwitterService from '@/services/TwitterService'

export const namespaced = true

export const state = {
  users: [],
  hashTags: [],
}

export const mutations = {
  SET_USERS(state, data) {
    state.users = data
  },
}

export const actions = {
  getUsersWithDescription({ commit }, descr) {
    return TwitterService.getUsers(descr).then(data => {
      commit('SET_USERS', data.data.GetUser)
    })
  },
}

export const getters = {}
