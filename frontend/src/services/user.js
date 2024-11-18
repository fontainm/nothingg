import api from '@/plugins/axios'

import { useUsersStore } from '@/stores/users'

const baseUrl = '/user'

const createUser = async (credentials) => {
  const response = await api.post(`${baseUrl}/signup`, credentials)
  return response.data
}

const getMe = async () => {
  const config = {
    headers: { Authorization: useUsersStore().token, 'x-hide-message': true }
  }

  const response = await api.get(`${baseUrl}/me`, config)
  return response.data
}

const updateUsername = async (username) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await api.put(`${baseUrl}/username`, username, config)
  return response.data
}

const changeEmail = async (newEmail) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await api.post(`${baseUrl}/change-email`, { email: newEmail }, config)
  return response.data
}

const verifyChangeEmail = async (token) => {
  const response = await api.post(`${baseUrl}/verify-change-email?token=${token}`)
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

const loginUser = async (credentials) => {
  const response = await api.post(`${baseUrl}/login`, credentials)
  return response
}

const recoverPassword = async (email) => {
  const response = await api.post(`${baseUrl}/recover-password`, email)
  return response.data
}

const resetPassword = async (token, password) => {
  const response = await api.post(`${baseUrl}/reset-password`, { token, password })
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
  createUser,
  getMe,
  updateUsername,
  changeEmail,
  verifyChangeEmail,
  updateEmail,
  updatePassword,
  deleteUser,
  recoverPassword,
  resetPassword,
  resendEmail,
  verifyUser,
  loginUser
}
