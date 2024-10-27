import { test } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

test('api is healthy', async () => {
  await api.get('/api/health').expect(200)
})
