import { test, describe } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

const clearDb = async () => {
  await api.delete('/api/users')
}

const seedDb = async () => {
  const users = [
    {
      email: 'test1@example.com',
      username: 'testuser1',
      password: 'hashedpassword1',
    },
    {
      email: 'test2@example.com',
      username: 'testuser2',
      password: 'hashedpassword2',
    },
    {
      email: 'test3@example.com',
      username: 'testuser3',
      password: 'hashedpassword3',
    },
  ]

  for (const user of users) {
    await api.post('/api/user/signup').set('x-auth-token', authToken).send(user)
  }
}

describe('users.test.js', async () => {
  await clearDb()
  await seedDb()

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
      const expectedId = 2
      const expectedUsername = 'testuser2'

      const response = await api
        .get('/api/users/2')
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
      await api.delete('/api/users').set('x-auth-token', authToken).expect(200)
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
