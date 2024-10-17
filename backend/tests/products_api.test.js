import { test, describe, beforeEach } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

test('get one product', async () => {
  await api
    .get('/api/products/1')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get all products', async () => {
  await api
    .get('/api/products')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
