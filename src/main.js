import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// FontAwesome Custom Compoment
import ToyIcon from './utils/ToyIcon.vue';

// createApp(App).mount('#app');
const app = createApp(App);
app.use(router);
app.component('toy-icon', ToyIcon);
app.mount('#app');