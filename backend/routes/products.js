import express from 'express'
import { protectRoute } from '../utils/middleware.js'
import { getProductById, getProducts } from '../controllers/products.js'

const productsRouter = express.Router()

productsRouter.get('/', protectRoute, async (req, res, next) => {
  try {
    const products = await getProducts()
    res.success(products, 'Products fetched successfully')
  } catch (error) {
    next(error)
  }
})

productsRouter.get('/:id', protectRoute, async (req, res, next) => {
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
