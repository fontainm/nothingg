import express from 'express'
import { validationHandler } from '../utils/middleware.js'
import {
  userIdRules,
  userSignUpRules,
  usernameRules,
  emailRules,
  passwordUpdateRules,
} from '../validators/userValidator.js'
import {
  getUserById,
  getUsers,
  getUsersCount,
  createUser,
  deleteUsers,
  updateUsername,
  updateEmail,
  updatePassword,
} from '../controllers/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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
  res.success(users, 'Users fetched successfully')
})

usersRouter.get('/total', async (req, res) => {
  const total = await getUsersCount()
  res.success(total, 'Total users fetched successfully')
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
        res.success(user, 'User fetched successfully')
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
      res.success(user, 'User created successfully', 201)
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
      const response = await updateUsername(user.id, req.body.username)
      res.success(response, 'Username updated successfully')
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
      const response = await updateEmail(user.id, req.body.email)
      res.success(response, 'Email updated successfully')
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.put(
  '/password',
  passwordUpdateRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      const user = await getUserById(decodedToken.id)

      const passwordCorrect = !user
        ? false
        : await bcrypt.compare(req.body.oldPassword, user.password)

      if (!(user && passwordCorrect)) {
        return res.status(401).send({
          errors: [
            {
              msg: 'Current password is not correct',
              type: 'field',
            },
          ],
        })
      }

      await updatePassword(user.id, req.body.newPassword)
      res.success(null, 'Password successfully updated')
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
