import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import PanoramaView from './components/PanoramaView.vue';
import UserPage from './components/UserPage.vue';
import RankPage from './components/RankPage.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/', component: PanoramaView, meta: { requiresAuth: true } },
  { path: '/user', component: UserPage, meta: { requiresAuth: true } },
  { path: '/rank', component: RankPage, meta: { requiresAuth: true } }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

// 路由守卫 - 检查用户是否已登录
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  if (to.meta.requiresAuth && !currentUser) {
    next('/login');
  } else if (to.path === '/login' && currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
