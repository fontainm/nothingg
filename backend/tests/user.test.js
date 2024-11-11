import { test, describe, before, after } from 'node:test'
import supertest from 'supertest'
import app from '../app.js'
import assert from 'assert'
import { clearDbUsers, endPool, seedDbUsers } from './db_utils.js'
import { v4 as uuidv4 } from 'uuid'
import timekeeper from 'timekeeper'

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
  let emailVerifyToken = ''
  let passwordResetToken = ''

  describe('user.test.js', () => {
    describe('POST /api/user/signup', () => {
      let credentials = {
        username: 'testuser0',
        email: 'test0@test.test',
        password: 'hashedpassword0',
      }

      test('Should fail with invalid username', async () => {
        const expectedMessage =
          'Username can only contain letters, numbers, underscores, and dots.'

        const response = await api
          .post('/api/user/signup')
          .set('x-auth-token', authToken)
          .send({ ...credentials, username: '&/()§$' })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail if username already exists', async () => {
        const expectedMessage = 'Username or email already taken'

        const response = await api
          .post('/api/user/signup')
          .set('x-auth-token', authToken)
          .send({ ...credentials, username: 'testuser1' })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail with invalid email', async () => {
        const expectedMessage = 'Please provide a valid email address'

        const response = await api
          .post('/api/user/signup')
          .set('x-auth-token', authToken)
          .send({ ...credentials, email: 'invalidemail' })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail with invalid password', async () => {
        const expectedMessage = 'Password must be at least 6 characters long'

        const response = await api
          .post('/api/user/signup')
          .set('x-auth-token', authToken)
          .send({ ...credentials, password: 'short' })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid credentials', async () => {
        const expectedMessage = 'User created successfully'

        const response = await api
          .post('/api/user/signup')
          .set('x-auth-token', authToken)
          .send(credentials)
          .expect(201)

        const { message } = response.body
        assert.equal(message, expectedMessage)
        assert.ok(response.body.data.verify_token)

        emailVerifyToken = response.body.data.verify_token
      })
    })

    describe('POST /api/user/verify', () => {
      test('Should fail with invalid token', async () => {
        const expectedMessage = 'Invalid verification token format.'
        const invalidToken = '0000-invalid-token-0000'

        const response = await api
          .post(`/api/user/verify?token=${invalidToken}`)
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail if no user can be found', async () => {
        const expectedMessage = 'User not found'
        const notFoundToken = uuidv4()

        const response = await api
          .post(`/api/user/verify?token=${notFoundToken}`)
          .expect(404)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid token', async () => {
        const expectedMessage = 'User verified successfully'

        const response = await api
          .post(`/api/user/verify?token=${emailVerifyToken}`)
          .expect(200)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail when user has already been verified', async () => {
        const expectedMessage = 'User has already been verified'

        const response = await api
          .post(`/api/user/verify?token=${emailVerifyToken}`)
          .expect(409)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })
    })

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
        userToken = `Bearer ${response.body.data.token}`

        assert.ok(response.body.data.token)
        assert.equal(message, expectedMessage)
      })
    })

    describe('GET /api/user/me', () => {
      test('Should fail with invalid token', async () => {
        const expectedMessage = 'Invalid token'

        const response = await api
          .get('/api/user/me')
          .set('Authorization', `Bearer eyInavlidtoken`)
          .expect(401)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid token', async () => {
        const expectedMessage = 'User fetched successfully'

        const response = await api
          .get('/api/user/me')
          .set('Authorization', userToken)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })
    })

    describe('PUT /api/user/username', () => {
      test('Should fail with invalid username', async () => {
        const expectedMessage = 'Username must be between 3 and 20 characters.'
        const shortUsername = 'no'

        const response = await api
          .put('/api/user/username')
          .set('Authorization', userToken)
          .send({ username: shortUsername })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid username', async () => {
        const expectedMessage = 'Username updated successfully'
        const username = 'validusername'

        const response = await api
          .put('/api/user/username')
          .set('Authorization', userToken)
          .send({ username })
          .expect(200)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })
    })

    describe('PUT /api/user/email', () => {
      test('Should fail with invalid email', async () => {
        const expectedMessage = 'Please provide a valid email address'
        const invalidEmail = 'invalidmail'

        const response = await api
          .put('/api/user/email')
          .set('Authorization', userToken)
          .send({ email: invalidEmail })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid email', async () => {
        const expectedMessage = 'Email updated successfully'
        const email = 'test@tester.test'

        const response = await api
          .put('/api/user/email')
          .set('Authorization', userToken)
          .send({ email })
          .expect(200)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })
    })

    describe('PUT /api/user/password', () => {
      test('Should fail with invalid current password', async () => {
        const expectedMessage = 'Current password is not correct'
        const oldPassword = 'wrongpassword'
        const newPassword = '123456'

        const response = await api
          .put('/api/user/password')
          .set('Authorization', userToken)
          .send({ oldPassword, newPassword })
          .expect(401)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail with invalid new password', async () => {
        const expectedMessage = 'Password must be at least 6 characters long'
        const oldPassword = 'hashedpassword1'
        const newPassword = '123'

        const response = await api
          .put('/api/user/password')
          .set('Authorization', userToken)
          .send({ oldPassword, newPassword })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid email', async () => {
        const expectedMessage = 'Password successfully updated'
        const oldPassword = 'hashedpassword1'
        const newPassword = '123456'

        const response = await api
          .put('/api/user/password')
          .set('Authorization', userToken)
          .send({ oldPassword, newPassword })
          .expect(200)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })
    })

    describe('POST /api/user/recover-password', () => {
      test('Should fail if email is not found', async () => {
        const expectedMessage = 'User not found'

        const response = await api
          .post('/api/user/recover-password')
          .set('x-auth-token', authToken)
          .send({ email: 'notfound@test.test' })
          .expect(404)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid email', async () => {
        const expectedMessage = 'Mail sent successfully'

        const response = await api
          .post('/api/user/recover-password')
          .set('x-auth-token', authToken)
          .send({ email: 'test3@example.com' })
          .expect(200)

        const { message } = response.body

        assert.equal(message, expectedMessage)
        assert.ok(response.body.data.resetToken)

        passwordResetToken = response.body.data.resetToken
      })
    })

    describe('POST /api/user/reset-password', () => {
      test('Should fail with invalid token', async () => {
        const expectedMessage = 'Invalid token'

        const response = await api
          .post('/api/user/reset-password')
          .send({ token: 'invalidtoken', password: 'newpassword' })
          .expect(401)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should fail with expired token', async () => {
        const expectedMessage = 'Token expired'

        const now = new Date()
        const expiredTime = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours
        timekeeper.travel(expiredTime)

        const response = await api
          .post('/api/user/reset-password')
          .send({ token: passwordResetToken, password: 'newpassword' })
          .expect(401)

        const { message } = response.body
        assert.equal(message, expectedMessage)

        timekeeper.reset()
      })

      test('Should fail with invalid password', async () => {
        const expectedMessage = 'Password must be at least 6 characters long'

        const response = await api
          .post('/api/user/reset-password')
          .send({ token: passwordResetToken, password: 'short' })
          .expect(400)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })

      test('Should succeed with valid password', async () => {
        const expectedMessage = 'Password successfully reset'

        const response = await api
          .post('/api/user/reset-password')
          .send({ token: passwordResetToken, password: 'newpassword' })
          .expect(200)

        const { message } = response.body
        assert.equal(message, expectedMessage)
      })
    })

    describe('DELETE /api/user/me', () => {
      // TODO: Test delete me
    })
  })
})
