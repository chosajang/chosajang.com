import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogView from '../views/BlogView.vue';
import ProfileView from '../views/ProfileView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    component: BlogView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  { /* 404 error 방지 */
    path: '*',
    redirect: '/'
  }
];

export const router = new VueRouter({
  mode: 'history',
  routes
});
