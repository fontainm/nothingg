import { test, describe, after } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'
import { endPool } from './db_utils.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

after(async () => {
  await endPool()
})

describe('products.test.js', () => {
  describe('GET /api/products', () => {
    test('Should fail without auth token', async () => {
      const expectedMessage = 'Access denied'
      const response = await api.get('/api/products').expect(403)

      assert.equal(response.body.message, expectedMessage)
    })

    test('Should get all products', async () => {
      const expectedLength = 2
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
      const expectedProductTitle = 'Nothingg'

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
