import api from '@/plugins/axios'

import { useUsersStore } from '@/stores/users'

const baseUrl = '/users'

const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

const getMe = async () => {
  const config = {
    headers: { Authorization: useUsersStore().token, 'x-hide-message': true }
  }

  const response = await api.get(`${baseUrl}/me`, config)
  return response.data
}

const countAll = async () => {
  const response = await api.get(`${baseUrl}/total`, { headers: { 'x-hide-message': true } })
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

const deleteUser = async ({ password }) => {
  const config = {
    headers: { Authorization: useUsersStore().token },
    data: { password }
  }

  const response = await api.delete(`${baseUrl}/me`, config)
  return response.data
}

const resendEmail = async (email) => {
  const response = await api.post(`${baseUrl}/resend-email`, email)
  return response.data
}

const verifyUser = async (token) => {
  const response = await api.post(`${baseUrl}/verify?token=${token}`)
  return response.data
}

export default {
  getAll,
  getMe,
  countAll,
  createUser,
  updateUsername,
  updateEmail,
  updatePassword,
  deleteUser,
  resendEmail,
  verifyUser
}
