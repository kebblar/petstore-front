import { createRouter, createWebHistory } from 'vue-router'
//import { createRouter } from 'vue-router'

//import * as Vue from 'vue'
//import Router from 'vue-router'

import HomeView from '../views/HomeView.vue'
import UsaModal from '../views/UsaModal.vue'

//Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/usa-modal',
    name: 'usa-modal',
    component: UsaModal
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({ history: createWebHistory(), routes })

export default router
