import api from '@/plugins/axios'

import { useUsersStore } from '@/stores/users'

const baseUrl = '/users'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const countAll = async () => {
  const response = await api.get(`${baseUrl}/total`, { headers: { 'x-hide-message': true } })
  return response.data
}

const deleteUser = async ({ password }) => {
  const config = {
    headers: { Authorization: useUsersStore().token },
    data: { password }
  }

  const response = await api.delete(`${baseUrl}/me`, config)
  return response.data
}

export default {
  getAll,
  countAll,
  deleteUser
}
