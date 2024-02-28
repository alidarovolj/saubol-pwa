import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: () => import('../views/index.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/profile/index.vue')
    },
    {
      path: '/profile/my-data',
      name: 'ProfileData',
      component: () => import('../views/profile/my-data/index.vue')
    },
    {
      path: '/profile/docs',
      name: 'ProfileDocs',
      component: () => import('../views/profile/docs/index.vue')
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('../views/orders/index.vue')
    },
    {
      path: '/orders/:id',
      name: 'OrdersDetails',
      component: () => import('../views/orders/detail/index.vue')
    },
    {
      path: '/time-settings',
      name: 'TimeSettings',
      component: () => import('../views/time-settings/index.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../views/settings/index.vue')
    },
  ]
})

export default router
