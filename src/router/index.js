import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminBoardView from '../views/admin/board';
import AdminLoginView from '../views/admin/login';
import AdminArticleListView from '../views/admin/article/list';
import AdminArticleView from '../views/admin/article';
import AdminUserView from '../views/admin/user';

import BlogView from '../views/service/blog';
import ProjectView from '../views/service/project';
import ProfileView from '../views/service/profile';

import { getUserInfo } from '../utils/common.js';

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  if (getUserInfo() !== false) {
    return next();
  } else {
    // login 재귀호출 방지
    if (to.name === 'admin.login') {
      return next();
    } else {
      return next('/admin/login');
    }
  }
};

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
    component: ProjectView
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'ServiceLayout'
    },
    component: ProfileView
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/login'
  },
  {
    path: '/admin/login',
    name: 'admin.login',
    component: AdminLoginView,
    beforeEnter: requireAuth()
  },
  {
    path: '/admin/user',
    name: 'admin.user',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminUserView,
    beforeEnter: requireAuth()
  },
  {
    path: '/admin/board',
    name: 'admin.board',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminBoardView,
    beforeEnter: requireAuth()
  },
  {
    path: '/admin/article/list',
    name: 'admin.article.list',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminArticleListView,
    beforeEnter: requireAuth()
  },
  {
    path: '/admin/article',
    name: 'admin.article',
    meta: {
      layout: 'AdminLayout'
    },
    component: AdminArticleView,
    beforeEnter: requireAuth()
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
