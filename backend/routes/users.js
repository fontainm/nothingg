import express from 'express'
import {
  protectRoute,
  validationHandler,
  protectDeleteRoute,
} from '../utils/middleware.js'

import { userIdRules } from '../validators/userValidator.js'
import {
  getUserById,
  getUsers,
  getUsersCount,
  deleteUser,
  deleteUsers,
} from '../controllers/users.js'

const usersRouter = express.Router()

usersRouter.get('/', protectRoute, async (req, res, next) => {
  try {
    const users = await getUsers()
    res.success(users, 'Users fetched successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/total', protectRoute, async (req, res, next) => {
  try {
    const total = await getUsersCount()
    res.success(total, 'Total users fetched successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.get(
  '/:id',
  protectRoute,
  userIdRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await getUserById(id)
      if (user) {
        res.success(user, 'User fetched successfully')
      } else {
        res.error(null, 'User not found', 404)
      }
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.delete('/:id', protectDeleteRoute, async (req, res, next) => {
  try {
    await deleteUser(req.params.id)
    res.success(null, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/', protectDeleteRoute, async (req, res, next) => {
  try {
    await deleteUsers()
    res.success(null, 'Users deleted successfully')
  } catch (error) {
    next(error)
  }
})

export default usersRouter
