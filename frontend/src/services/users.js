import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const countAll = () => {
  const request = axios.get(`${baseUrl}/total`)
  return request.then((response) => response.data)
}

export default { getAll, countAll }
