import api from '@/plugins/axios'

const baseUrl = '/products'

const getProducts = async () => {
  const response = await api.get(baseUrl, { headers: { 'x-hide-message': true } })
  return response.data
}

export default { getProducts }
