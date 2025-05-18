import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/layouts/FullLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: '/curriculum',
          name: 'curriculum',
          component: () => import('@/views/OnlyCurriculumView.vue'),
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/resume/:id',
          name: 'resume',
          component: () => import('@/views/OnlyCurriculumView.vue'),
        },
        {
          path: '/premium',
          name: 'premium',
          component: () => import('@/views/PremiumView.vue'),
        },
        {
          path: '/pagamento',
          name: 'pagamento',
          component: () => import('@/views/PagamentoView.vue'),
        },
      ],
    },
  ],
})

export default router
