import express from 'express'
import { getUser, getUsers, getUsersCount, createUser } from './database.js'

const app = express()

app.use(express.json())

app.get('/info', async (req, res) => {
  res.send('Working!')
})

app.get('/users', async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

app.get('/countusers', async (req, res) => {
  const users = await getUsersCount()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

app.post('/users', async (req, res) => {
  const { username, email, password } = req.body
  const user = await createUser(username, email, password)
  res.status(201).send(user)
})

app.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).send('something went wrong')
})

app.listen(3001, () => {
  console.log('server is running on 3001')
})
