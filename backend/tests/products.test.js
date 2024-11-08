import { test, describe, after } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'
import { pool } from '../database.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

after(async () => {
  await pool.end()
})

describe('products.test.js', () => {
  describe('GET /api/products', () => {
    const expectedLength = 2

    test('Should get all products', async () => {
      const response = await api
        .get('/api/products')
        .set('x-auth-token', authToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.equal(response.body.data.length, expectedLength)
    })
  })

  describe('GET /api/products/:id', () => {
    test('Should return 404 if the product is not found', async () => {
      await api
        .get('/api/products/999')
        .set('x-auth-token', authToken)
        .expect(404)
    })

    test('Should return one product', async () => {
      const expectedProductTitle = 'Nothing' // TODO: update product name

      const response = await api
        .get('/api/products/1')
        .set('x-auth-token', authToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const product = response.body.data

      assert.equal(product.title, expectedProductTitle)
    })
  })
})
