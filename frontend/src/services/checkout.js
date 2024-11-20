import api from '@/plugins/axios'

const baseUrl = '/checkout'

const createCheckoutSession = async () => {
  const response = await api.post(`${baseUrl}/sessions`, null, {
    headers: { 'x-hide-message': true }
  })
  window.location = response.data.url
}

export default { createCheckoutSession }
