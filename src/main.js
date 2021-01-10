import { createApp } from 'vue';
import App from './App.vue';
// FontAwesome Custom Compoment
import ToyIcon from './utils/ToyIcon.vue';

// createApp(App).mount('#app');
const app = createApp(App);

app.component('toy-icon', ToyIcon);
app.mount('#app');