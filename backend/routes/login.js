import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { getUserByUsername } from '../controllers/users.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await getUserByUsername(username)

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  response.status(200).send({ token, username: user.username })
})

export default loginRouter
