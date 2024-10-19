import { test, describe, beforeEach } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)

test('api is running', async () => {
  await api.get('/api/info').expect(200)
})

describe('when there is no user in users table', () => {
  beforeEach(async () => {
    await api.delete('/api/users')
  })

  test('user can be created', async () => {
    const user = {
      username: 'testuser',
      email: 'testmail@test.test',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // TODO: assert id
  })
})

test('user can log in', async () => {
  const user = {
    username: 'testuser',
    password: 'password',
  }

  await api
    .post('/api/login')
    .send(user)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get one user', async () => {
  await api
    .get('/api/users/1')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // TODO: assert name of user
})

test('get all users', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('get total number of users', async () => {
  await api
    .get('/api/users/total')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // TODO: assert field total
})

describe('as a logged in user', () => {
  let authToken = null

  beforeEach(async () => {
    const user = {
      username: 'testuser', // TODO: After usernmae changed?
      password: 'password',
    }

    const response = await api.post('/api/login').send(user)

    authToken = response.body.token
  })

  test('logged in user can update username', async () => {
    await api
      .put('/api/users/username')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ username: 'testuser' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('logged in user can update email', async () => {
    await api
      .put('/api/users/email')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ email: 'newmail@newmail.newmail' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

// TODO: Test update password
