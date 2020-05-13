import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/common/login';
import BlogView from '../views/service/blog';
import ProjectView from '../views/service/project';
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
    path: '/login',
    name: 'login',
    meta: {
      type: ''
    },
    component: LoginView,
    beforeEnter: (to, from, next) => {
      console.log('to', to);
      next();
    }
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
    path: '/project',
    name: 'project',
    meta: {
      type: 'service'
    },
    component: ProjectView,
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
