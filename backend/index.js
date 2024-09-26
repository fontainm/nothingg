import express from 'express'
import { getUser, createUser, getUsers } from './database.js'

const app = express()

app.use(express.json())

app.get('/users', async (req, res) => {
  const users = await getUsers()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.send(user)
})

app.post('/users', async (req, res) => {
  const { email, password } = req.body
  const user = await createUser(email, password)
  res.status(201).send(user)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('something went wrong')
})

app.listen(3001, () => {
  console.log('server is running on 3001')
})
