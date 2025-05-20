import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Dashboard' }
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('../views/Education.vue'),
    meta: { title: 'Strategy & Education' }
  },
  {
    path: '/marketing',
    name: 'Marketing',
    component: () => import('../views/Marketing.vue'),
    meta: { title: 'Marketing' }
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('../views/Sales.vue'),
    meta: { title: 'Sales & Negotiation' }
  },
  {
    path: '/deals',
    name: 'Deals',
    component: () => import('../views/Deals.vue'),
    meta: { title: 'Analysis & Due Diligence' }
  },
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('../views/Finance.vue'),
    meta: { title: 'Finance' }
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () => import('../views/Operations.vue'),
    meta: { title: 'Operations' }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue'),
    meta: { title: 'Sign In' }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
    meta: { title: 'Sign Up' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Set document title based on route meta
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Real Estate Investor Toolkit` || 'Real Estate Investor Toolkit'
  next()
})

export default router 