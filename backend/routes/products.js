import express from 'express'
import { getProductById, getProducts } from '../controllers/products.js'

const productsRouter = express.Router()

productsRouter.get('/', async (req, res) => {
  const users = await getProducts()
  res.send(users)
})

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await getProductById(id)
    if (product) {
      res.send(product)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

export default productsRouter
