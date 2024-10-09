import express from 'express'
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

usersRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const user = await getUser(id)
    res.send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    const user = await createUser(username, email, password)
    res.status(201).send(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/', async (req, res) => {
  await deleteUsers()
  res.status(204).end()
})

export default usersRouter
