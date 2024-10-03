import axios from 'axios'

const baseUrl = '/api'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const countAll = () => {
  const request = axios.get(`${baseUrl}/users/total`)
  return request.then((response) => response.data)
}

export default { getAll, countAll }
