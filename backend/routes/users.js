import express from 'express'
import { validationHandler } from '../utils/middleware.js'
import {
  userIdRules,
  userSignUpRules,
  usernameRules,
  emailRules,
} from '../validators/userValidator.js'
import {
  getUserById,
  getUsers,
  getUsersCount,
  createUser,
  deleteUsers,
  updateUsername,
  updateEmail,
} from '../controllers/users.js'
import jwt from 'jsonwebtoken'

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

usersRouter.get('/total', async (req, res) => {
  const users = await getUsersCount()
  res.send(users)
})

usersRouter.get(
  '/:id',
  userIdRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await getUserById(id)
      if (user) {
        res.send(user)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.post(
  '/',
  usernameRules(),
  userSignUpRules(),
  validationHandler,
  async (req, res, next) => {
    const { username, email, password } = req.body
    try {
      const user = await createUser(username, email, password)
      res.status(201).send(user)
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.put(
  '/username',
  usernameRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      const user = await getUserById(decodedToken.id)
      const updatedUsername = await updateUsername(user.id, req.body.username)
      res.status(200).send(updatedUsername)
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.put(
  '/email',
  emailRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      const user = await getUserById(decodedToken.id)
      const updatedEmail = await updateEmail(user.id, req.body.email)
      res.status(200).send(updatedEmail)
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.delete('/', async (req, res) => {
  await deleteUsers()
  res.status(204).end()
})

export default usersRouter
