import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// FontAwesome Custom Compoment
import ToyIcon from './utils/ToyIcon.vue';
import Meta from 'vue-meta';

// createApp(App).mount('#app');
const app = createApp(App);
app.use(router);
app.use(Meta);
app.component('toy-icon', ToyIcon);
app.mount('#app');