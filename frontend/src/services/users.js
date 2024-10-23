import api from '@/plugins/axios'

import { useUsersStore } from '@/stores/users'

const baseUrl = '/users'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const countAll = async () => {
  const response = await api.get(`${baseUrl}/total`)
  return response.data
}

const createUser = async (credentials) => {
  const response = await api.post(baseUrl, credentials)
  return response.data
}

const updateUsername = async (username) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await api.put(`${baseUrl}/username`, username, config)
  return response.data
}

const updateEmail = async (email) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await api.put(`${baseUrl}/email`, email, config)
  return response.data
}

const updatePassword = async ({ oldPassword, newPassword }) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await api.put(`${baseUrl}/password`, { oldPassword, newPassword }, config)
  return response.data
}

export default { getAll, countAll, createUser, updateUsername, updateEmail, updatePassword }
