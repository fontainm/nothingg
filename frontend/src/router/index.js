import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from '@/stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to) {
    useAppStore().closeMenu()

    if (to.hash) {
      return { el: to.hash }
    }

    return { top: 0, left: 0 }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/DemoView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue')
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import('../views/TermsConditionsView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = useUsersStore().isLoggedIn

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && isLoggedIn) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
