import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue') // Lazy loading the Login component
    },
    {
      path: '/login',
      redirect: '/' // Redirect /login to the root path
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView.vue') // Lazy loading the Signup component
    }
  ]
})

export default router
