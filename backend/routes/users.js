import express from 'express'
import { getUser, getUsers, getUsersCount, createUser } from '../controllers/users.js'

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
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

usersRouter.post('/', async (req, res) => {
  const { username, email, password } = req.body
  const user = await createUser(username, email, password)
  res.status(201).send(user)
})

export default usersRouter
