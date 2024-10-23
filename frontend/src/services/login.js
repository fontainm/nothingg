import api from '@/plugins/axios'

const baseUrl = '/login'

const login = async (credentials) => {
  const response = await api.post(baseUrl, credentials)
  return response
}

export default { login }
