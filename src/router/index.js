import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminBoardView from '../views/admin/board';
import AdminGroupView from '../views/admin/group';
import AdminLoginView from '../views/admin/login';
import AdminPostView from '../views/admin/post';
import AdminUserView from '../views/admin/user';

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
    component: AdminLoginView,
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
    path: '/admin/group',
    name: 'admin.group',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminGroupView
  },
  {
    path: '/admin/board',
    name: 'admin.board',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminBoardView
  },
  {
    path: '/admin/post',
    name: 'admin.post',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminPostView
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
