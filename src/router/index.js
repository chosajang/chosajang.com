import { createWebHistory, createRouter } from 'vue-router'

import BlogListView from '@/views/blog/list.vue'
import BlogView from '@/views/blog/view.vue'

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
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes
});

export default router