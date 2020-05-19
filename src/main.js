import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { store } from './store/index.js';
import VueCompositionApi from '@vue/composition-api';
import Bootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(Bootstrap);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
