import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from '@/stores/users'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to) {
    useAppStore().closeMenu()

    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    return { top: 0, left: 0 }
  },

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'A Place Where Simplicity Meets Tranquility'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        title: 'Login',
        requiresGuest: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
      meta: {
        title: 'Sign Up',
        requiresGuest: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/ForgotPasswordView.vue'),
      meta: {
        title: 'Forgot Password',
        requiresGuest: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
      meta: {
        title: 'Privacy Policy'
      }
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import('../views/TermsConditionsView.vue'),
      meta: {
        title: 'Terms & Conditions'
      }
    },
    {
      path: '/users/verify',
      name: 'users-verify',
      component: () => import('../views/VerifyUserView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { title } = to.meta
  const defaultTitle = useAppStore().appTitle
  document.title = title ? `${defaultTitle} - ${title}` : defaultTitle

  const hasToken = useUsersStore().token
  if (to.meta.requiresAuth && !hasToken) {
    next({ name: 'login' })
  } else if (to.meta.requiresGuest && hasToken) {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
