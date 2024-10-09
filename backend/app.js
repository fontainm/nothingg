import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import { errorHandler } from './utils/middleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/api/info', async (req, res) => {
  res.status(200).send('Working!')
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

export default app
