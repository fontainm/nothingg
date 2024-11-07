import { test, describe, before, after, beforeEach } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'
import { clearDbUsers, seedDbUsers } from './db_utils.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

before(async () => {
  await clearDbUsers(api)
  await seedDbUsers(api)
})

describe('users.test.js', async () => {
  describe('GET /api/users', () => {
    test('Should get 3 users', async () => {
      const expectedLength = 3

      const response = await api
        .get('/api/users')
        .set('x-auth-token', authToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.equal(response.body.data.length, expectedLength)
    })
  })

  describe('GET /api/users/:id', () => {
    test('Should return 404 if the user is not found', async () => {
      await api.get('/api/users/999').set('x-auth-token', authToken).expect(404)
    })

    test('Should return the user with the given id', async () => {
      const expectedId = 1
      const expectedUsername = 'testuser1'

      const response = await api
        .get('/api/users/1')
        .set('x-auth-token', authToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const { id, username } = response.body.data

      assert.equal(id, expectedId)
      assert.equal(username, expectedUsername)
    })
  })

  describe('GET /api/users/total', () => {
    test('Should return a total of 3', async () => {
      const expectedTotal = 3

      const response = await api
        .get('/api/users/total')
        .set('x-auth-token', authToken)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const { total } = response.body.data

      assert.equal(total, expectedTotal)
    })
  })

  describe('DELETE /api/users/:id', () => {
    test('Should return 404 if the user to delete is not found', async () => {
      await api
        .delete('/api/users/999')
        .set('x-auth-token', authToken)
        .expect(200)
    })

    test('Should delete the user with the given id', async () => {
      await api
        .delete('/api/users/1')
        .set('x-auth-token', authToken)
        .expect(200)
    })

    test('Should reduce the total number of users', async () => {
      const expectedTotal = 2

      const response = await api
        .get('/api/users/total')
        .set('x-auth-token', authToken)
        .expect(200)

      const { total } = response.body.data

      assert.equal(total, expectedTotal)
    })
  })

  describe('DELETE /api/users', () => {
    test('Should delete all users', async () => {
      await api.delete('/api/users').expect(200)
    })

    test('Should return a total of 0', async () => {
      const expectedTotal = 0

      const response = await api
        .get('/api/users/total')
        .set('x-auth-token', authToken)
        .expect(200)

      const { total } = response.body.data

      assert.equal(total, expectedTotal)
    })
  })
})
