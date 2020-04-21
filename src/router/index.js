import Vue from 'vue';
import VueRouter from 'vue-router';
import BlogView from '../views/service/blog';
import ProfileView from '../views/service/profile';
import AdminUserView from '../views/admin/user';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'default',
    meta: {
      type: 'service'
    },
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    meta: {
      type: 'service'
    },
    component: BlogView,
    beforeEnter: (to, from, next) => {
      console.log('to', to);
      next();
    }
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      type: 'service'
    },
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      console.log('to', to);
      next();
    }
  },
  {
    path: '/admin/user',
    name: 'admin.user',
    meta: {
      type: 'admin'
    },
    component: AdminUserView
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
