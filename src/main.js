import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/tailwind.css';
import { createHead } from '@vueuse/head';

const head = createHead();

store.dispatch('checkAuth').then(() => {
  createApp(App).use(store).use(router).use(head).mount('#app');
});
