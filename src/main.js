import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { store } from './store/index.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
