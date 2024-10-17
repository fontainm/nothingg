import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/products'

const getProducts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getProducts }
