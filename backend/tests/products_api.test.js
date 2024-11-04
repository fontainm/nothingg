import { test, describe, beforeEach } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

test('get one product', async () => {
  await api
    .get('/api/products/1')
    .set('x-auth-token', authToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get all products', async () => {
  await api
    .get('/api/products')
    .set('x-auth-token', authToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
