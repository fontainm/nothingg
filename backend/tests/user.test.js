import { test, describe, before, after } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'
import { clearDbUsers, endPool, seedDbUsers } from './db_utils.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

before(async () => {
  await clearDbUsers(api)
  await seedDbUsers(api)
})

after(async () => {
  await clearDbUsers(api)
  await endPool()
})

describe('user.test.js', async () => {
  let userToken = ''

  describe('user.test.js', async () => {
    describe('POST /api/user/login', () => {
      test('Should fail with invalid username', async () => {
        const expectedMessage = 'Invalid username or password'
        const credentials = {
          username: 'test',
          password: 'test',
        }

        const response = await api
          .post('/api/user/login')
          .send(credentials)
          .expect(401)
          .expect('Content-Type', /application\/json/)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid credentials', async () => {
        const expectedMessage = 'Login successful'
        const credentials = {
          username: 'testuser1',
          password: 'hashedpassword1',
        }

        const response = await api
          .post('/api/user/login')
          .send(credentials)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const { message } = response.body
        userToken = response.body.data.token
        assert.ok(response.body.data.token)
        assert.equal(message, expectedMessage)
      })
    })
  })
  // TODO: Test /me
  // TODO: Test verify
  // TODO: Test resend
  // TODO: Test recover
  // TODO: Test reset password
  // TODO: Test put username
  // TODO: Test put email
  // TODO: Test put password
  // TODO: Test delete me
})
