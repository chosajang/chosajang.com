import { createWebHistory, createRouter } from 'vue-router'

import BlogListView from '@/views/blog/list.vue'
import BlogView from '@/views/blog/view.vue'
import TestView from '@/views/blog/test.vue'

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
    component: BlogListView
  },
  {
    path: '/blog/:article_seq',
    name: 'blog',
    meta: {
      layout: 'ServiceLayout'
    },
    component: BlogView
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      layout: 'ServiceLayout'
    },
    component: TestView
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes
});

export default router