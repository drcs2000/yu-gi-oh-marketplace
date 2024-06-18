import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import Register from '../views/register.vue';
import Login from '../views/login.vue';
import Cards from '../views/cards.vue';
import TradeRequests from '../views/tradeRequests.vue';
import Profile from '../views/profile.vue';
import NotFound from '../views/page404.vue';
import store from '../store';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/cards', name: 'Cards', component: Cards, meta: { requiresAuth: true } },
  { path: '/trade-requests', name: 'TradeRequests', component: TradeRequests },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({ name: 'NotFound' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
