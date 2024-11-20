import api from '@/plugins/axios'

import { useUsersStore } from '@/stores/users'

const baseUrl = '/checkout'

const createCheckoutSession = async () => {
  const response = await api.post(`${baseUrl}/sessions`, null, {
    headers: { Authorization: useUsersStore().token, 'x-hide-message': true }
  })
  window.location = response.data.url
}

export default { createCheckoutSession }
