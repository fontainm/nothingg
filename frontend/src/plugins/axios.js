import axios from 'axios'
import { useAppStore } from '@/stores/app'

const api = axios.create({
  baseURL: '/api'
})

api.interceptors.response.use(
  (response) => {
    useAppStore().showInfoMessage('success', response.data.message)
    return response.data
  },
  (error) => Promise.reject(error)
)

export default api
