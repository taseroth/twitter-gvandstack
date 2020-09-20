import TwitterService from '@/services/TwitterService'

export const namespaced = true

export const state = {
  users: [],
  user: null,
  tweets: [],
  hashTags: [],
  error: null,
  tags: [],
}

export const mutations = {
  SET_USERS(state, data) {
    state.users = data
  },
  SET_ERROR(state, message) {
    state.error = message
  },
  SET_USER(state, data) {
    state.user = data
  },
  SET_TWEETS(state, data) {
    state.tweets = data
  },
  SET_TAGS(state, data) {
    state.tags = data
  },
}

export const actions = {
  fetchUsersByDescription({ commit }, descr) {
    commit('SET_ERROR', null)
    return TwitterService.getUsers(descr)
      .then(data => {
        commit('SET_USERS', data.data.GetUser)
      })
      .catch(error => {
        commit('SET_ERROR', error.message)
      })
  },
  fetchUserByScreenName({ commit }, screenName) {
    commit('SET_ERROR', null)
    return TwitterService.fetchUserByScreenName(screenName)
      .then(data => {
        if (data.data.GetUser.length === 0) {
          commit('SET_ERROR', 'no user with that screen name found')
        } else {
          commit('SET_USER', data.data.GetUser[0])
        }
      })
      .catch(error => {
        commit('SET_ERROR', error.message)
      })
  },
  fetchTweetsForUser({ commit }, screenName) {
    commit('SET_ERROR', null)
    return TwitterService.fetchTweetsForUser(screenName).then(data => {
      console.log('tweets:', data)
      commit('SET_TWEETS', data.data.GetUser[0].posts)
    })
  },
  fetchTagsForUser({ commit }, screenName) {
    commit('SET_ERROR', null)
    return TwitterService.fetchTagsForUser(screenName).then(data => {
      console.log('tags:', data)
      commit('SET_TAGS', data.data.GetUser[0].tagCounts)
    })
  },
}

export const getters = {}
