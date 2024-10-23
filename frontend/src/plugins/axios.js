import axios from 'axios'
import { useAppStore } from '@/stores/app'

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
    }
    return Promise.reject(error)
  }
)

export default api
