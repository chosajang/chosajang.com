import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import VueCompositionApi from '@vue/composition-api';
import Bootstrap from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Paginate from 'vuejs-paginate';
import store from './store/index.js';
import VueMoment from 'vue-moment';

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(Bootstrap);
Vue.use(VueSweetalert2);
Vue.use(VueMoment);
Vue.component('paginate', Paginate);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
