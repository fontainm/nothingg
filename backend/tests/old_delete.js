import { test, describe, beforeEach } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

describe('when there is no user in users table', () => {
  beforeEach(async () => {
    await api.delete('/api/users')
  })
})

test('user can log in', async () => {
  const user = {
    username: 'testuser',
    password: 'password',
  }

  await api
    .post('/api/users/login')
    .set('x-auth-token', authToken)
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get one user', async () => {
  await api
    .get('/api/users/1')
    .set('x-auth-token', authToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // TODO: assert name of user
})

test('get all users', async () => {
  await api
    .get('/api/users')
    .set('x-auth-token', authToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get total number of users', async () => {
  await api
    .get('/api/users/total')
    .set('x-auth-token', authToken)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // TODO: assert field total
})

describe('as a logged in user', () => {
  let userToken = null

  beforeEach(async () => {
    const user = {
      username: 'testuser', // TODO: After usernmae changed?
      password: 'password',
    }

    const response = await api.post('/api/users/login').send(user)

    userToken = response.body.data.token
  })

  test('logged in user can update username', async () => {
    await api
      .put('/api/users/username')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ username: 'testuser' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('logged in user can update email', async () => {
    await api
      .put('/api/users/email')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ email: 'newmail@newmail.newmail' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

// TODO: Test update password

// TODO: Test email verification

// TODO: Test email resend
