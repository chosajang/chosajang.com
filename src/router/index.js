import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginView from '../views/admin/login';
import AdminUserView from '../views/admin/user';
import AdminBoardView from '../views/admin/board';

import BlogView from '../views/service/blog';
import ProjectView from '../views/service/project';
import ProfileView from '../views/service/profile';

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
    meta: {
      layout: 'ServiceLayout'
    },
    component: BlogView,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/project',
    name: 'project',
    meta: {
      layout: 'ServiceLayout'
    },
    component: ProjectView,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'ServiceLayout'
    },
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      next();
    }
  },
  {
    path: '/admin/user',
    name: 'admin.user',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminUserView
  },
  {
    path: '/admin/board',
    name: 'admin.board',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminBoardView
  },
  { /* 404 error 방지 */
    path: '*',
    redirect: '/'
  }
];

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
