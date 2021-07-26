import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mutations from './mutations.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: false,
  state: {
    userInfo: {
      access_token: ''
    }
  },
  plugins: [
    createPersistedState({
      paths: ['userInfo'],
    })
  ],
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    }
  },
  mutations,
})

export default store