import Vue from 'vue';
import Vuex from 'vuex';
// import mutations from './mutations.js';
// import actions from './actions.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    config: {
      apiUrl: 'http://api.chosajang.com'
    },
    VALID: {
      EMAIL: 'EMAIL',
      TEXT: 'TEXT',
      PASSWORD: 'PASSWORD'
    }
  }
  // mutations,
  // actions
});
