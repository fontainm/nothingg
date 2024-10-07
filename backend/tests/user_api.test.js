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
