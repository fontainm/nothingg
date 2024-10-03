import axios from 'axios'

const baseUrl = 'https://nothing.uber.space/api' // TODO: LOCAL vs Production

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const countAll = () => {
  const request = axios.get(`${baseUrl}/users/total`)
  return request.then((response) => response.data)
}

export default { getAll, countAll }
