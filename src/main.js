import { createApp } from 'vue';
import App from './App.vue';

import toyIcon from './utils/toyIcon.vue';

// createApp(App).mount('#app');
const app = createApp(App);

app.component('toy-icon', toyIcon);
app.mount('#app');