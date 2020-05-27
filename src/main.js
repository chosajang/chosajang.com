import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import VueCompositionApi from '@vue/composition-api';
import Bootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(Bootstrap);
Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
