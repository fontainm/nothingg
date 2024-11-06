import { test, describe } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'

const api = supertest(app)
const authToken = process.env.AUTH_TOKEN

describe('user.test.js', async () => {
  // TODO: Test /me
  // TODO: Test login
  // TODO: Test verify
  // TODO: Test resend
  // TODO: Test recover
  // TODO: Test reset password
  // TODO: Test put username
  // TODO: Test put email
  // TODO: Test put password
  // TODO: Test delete me
})
