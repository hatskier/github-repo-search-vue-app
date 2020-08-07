import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const SEARCH_TERMS = 'search-terms'

const getSearchTermsFromLocalStorage = () => {
  let terms = []
  try {
    terms = JSON.parse(localStorage.getItem(SEARCH_TERMS))
  } catch (err) {
    console.error(err)
    localStorage.setItem(SEARCH_TERMS, '[]')
  }
  return terms || []
}

export default new Vuex.Store({
  state: {
    currentUser: {},
    savedSearchTerms: [],
  },
  mutations: {
    updateCurrentUser(state, currentUser) {
      state.currentUser = currentUser
    },
    updateSavedSearchTerms(state, searchTerms) {
      localStorage.setItem(SEARCH_TERMS, JSON.stringify(searchTerms))
      state.savedSearchTerms = searchTerms
    },
  },
  actions: {
    updateCurrentUser(context, currentUser) {
      context.commit('updateCurrentUser', currentUser || {})
    },
    addSearchTerm(context, searchTerm) {
      let terms = getSearchTermsFromLocalStorage()
      if (!terms.includes(searchTerm)) {
        terms.push(searchTerm)
        context.commit('updateSavedSearchTerms', terms)
      }
    },
    deleteSearchTerm(context, searchTerm) {
      let terms = getSearchTermsFromLocalStorage()
      terms = terms.filter(term => term !== searchTerm)
      context.commit('updateSavedSearchTerms', terms)
    },
    loadSearchTermsFromLocalStorage(context) {
      const terms = getSearchTermsFromLocalStorage()
      context.commit('updateSavedSearchTerms', terms)
    },
  }
})
