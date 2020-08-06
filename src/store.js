import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {},
    githubAccessToken: null,
  },
  mutations: {
    updateCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    },
    updateGithubAccessToken(state, token) {
      state.githubAccessToken = token
    },
  },
  actions: {
    updateCurrentUser(context, currentUser) {
      context.commit('updateCurrentUser', currentUser || {})
    },
    updateGithubAccessToken(context, token) {
      context.commit('updateGithubAccessToken', token)
    },
  }
})
