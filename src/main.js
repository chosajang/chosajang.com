import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { store } from './store/index.js';
import VueCompositionApi from '@vue/composition-api';
// import bootstrap from 'bootstrap-vue';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
