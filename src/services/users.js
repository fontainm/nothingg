import axios from 'axios'

const baseUrl = 'http://localhost:3001'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const countAll = () => {
  const request = axios.get(`${baseUrl}/countusers`)
  return request.then((response) => response.data)
}

export default { getAll, countAll }
