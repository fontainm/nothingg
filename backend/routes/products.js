import express from 'express'
import { getProductById, getProducts } from '../controllers/products.js'

const productsRouter = express.Router()

productsRouter.get('/', async (req, res) => {
  const products = await getProducts()
  res.success(products, 'Products fetched successfully')
})

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await getProductById(id)
    if (product) {
      res.success(product, 'Product fetched successfully')
    } else {
      res.error(null, 'Product not found', 404)
    }
  } catch (error) {
    next(error)
  }
})

export default productsRouter
