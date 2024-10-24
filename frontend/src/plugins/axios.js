import axios from 'axios'
import router from '@/router/index'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from '@/stores/users'

const api = axios.create({
  baseURL: '/api'
})

api.interceptors.response.use(
  (response) => {
    const showMessage = response?.config?.headers['x-hide-message'] !== 'true'
    if (showMessage && response.data.message) {
      useAppStore().showInfoMessage('success', response.data.message)
    }
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'

    if (message) {
      useAppStore().showInfoMessage('error', message)
      if (message === 'Token expired' || message === 'Invalid token') {
        useUsersStore().logoutUser()
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default api
