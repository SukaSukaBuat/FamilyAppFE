export const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/public/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/public/SignupView.vue')
  },
  {
    path: '/reset-password-request',
    name: 'reset-password-request',
    component: () => import('../views/public/ResetPasswordRequestView.vue')
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/public/ResetPasswordView.vue')
  }
]
