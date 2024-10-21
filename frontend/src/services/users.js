import axios from 'axios'
import { useUsersStore } from '@/stores/users'

const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const countAll = () => {
  const request = axios.get(`${baseUrl}/total`)
  return request.then((response) => response.data)
}

const createUser = (credentials) => {
  const request = axios.post(baseUrl, credentials)
  return request.then((response) => response.data)
}

const updateUsername = async (username) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await axios.put(`${baseUrl}/username`, username, config)
  return response.data
}

const updateEmail = async (email) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await axios.put(`${baseUrl}/email`, email, config)
  return response.data
}

const updatePassword = async ({ oldPassword, newPassword }) => {
  const config = {
    headers: { Authorization: useUsersStore().token }
  }

  const response = await axios.put(`${baseUrl}/password`, { oldPassword, newPassword }, config)
  return response.data
}

export default { getAll, countAll, createUser, updateUsername, updateEmail, updatePassword }
