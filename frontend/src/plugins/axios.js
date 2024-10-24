import axios from 'axios'
import router from '@/router/index'
import { useAppStore } from '@/stores/app'
import { useUsersStore } from '@/stores/users'

const api = axios.create({
  baseURL: '/api'
})

api.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      useAppStore().showInfoMessage('success', response.data.message)
    }
    return response.data
  },
  (error) => {
    if (error.response.data.message) {
      useAppStore().showInfoMessage('error', error.response.data.message)

      if (error.response.data.message === 'Token expired') {
        useUsersStore().logoutUser()
        router.push('/login')
      }
    }
    return Promise.reject(error)
  }
)

export default api
