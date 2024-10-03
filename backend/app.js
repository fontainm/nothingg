import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/info', async (req, res) => {
  res.send('Working!')
})

app.use('/api/users', usersRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('something went wrong')
})

export default app
