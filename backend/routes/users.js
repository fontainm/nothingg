import express from 'express'
import { validationHandler } from '../utils/middleware.js'
import { userIdRules, userSignUpRules } from '../validators/userValidator.js'
import {
  getUser,
  getUsers,
  getUsersCount,
  createUser,
  deleteUsers,
} from '../controllers/users.js'

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
      const user = await getUser(id)
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

usersRouter.delete('/', async (req, res) => {
  await deleteUsers()
  res.status(204).end()
})

export default usersRouter
