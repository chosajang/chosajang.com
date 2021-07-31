import Vue from 'vue'
import VueRouter from 'vue-router'
import VueGtag from 'vue-gtag'

import BlogListView from '../views/blog'
import BlogReadView from '../views/blog/read'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blogList',
    meta: {
      layout: 'ServiceLayout'
    },
    component: BlogListView,
  },
  {
    path: '/blog/:article_seq',
    name: 'blogRead',
    meta: {
      layout: 'ServiceLayout'
    },
    component: BlogReadView,
  },
  { /* 404 error 방지 */
    path: '*',
    redirect: '/'
  }
];


Vue.use(VueGtag, {
  config: {
      id: 'UA-23567625-3'
  },
  appName: 'chosajang.com',
  routes
});

export const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
