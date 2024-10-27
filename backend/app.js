import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'
import productsRouter from './routes/products.js'
import { responseHandler, errorHandler } from './utils/middleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.use(responseHandler)

app.get('/api/health', async (req, res) => {
  res.success()
})

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/products', productsRouter)

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: 'dist' })
})

app.use(errorHandler)

export default app
