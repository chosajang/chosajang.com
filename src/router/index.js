import { createWebHistory, createRouter } from "vue-router";

import BlogView from "../views/service/blog";
console.log('#2 router');
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
    component: BlogView
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes
});

export default router;