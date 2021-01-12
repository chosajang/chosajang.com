import { createWebHistory, createRouter } from "vue-router";

import BlogView from "../views/service/blog";

const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/blog'
  },
  {
    path: '/blog',
    name: 'blog',
    props: true,
    component: BlogView
  }
];

const router = new createRouter({
  history: createWebHistory(),
  routes
});

export default router;