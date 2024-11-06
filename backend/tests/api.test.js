import { test, describe } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'

const api = supertest(app)

describe('api.test.js', () => {
  test('GET /api/health', async () => {
    const response = await api.get('/api/health').expect(200)
    const { message } = response.body
    assert.equal(message, 'Operation successful')
  })
})
