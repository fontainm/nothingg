import api from '@/plugins/axios'

const baseUrl = '/products'

const getProducts = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

export default { getProducts }
