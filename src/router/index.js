import { createRouter, createWebHistory } from 'vue-router'
import { publicRoutes } from './public'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/home',
      redirect: '/'
    },
    ...publicRoutes,
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
