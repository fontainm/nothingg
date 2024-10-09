import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { getUserByUsername } from '../controllers/users.js'

const loginRouter = express.Router()

loginRouter.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await getUserByUsername(username)

    const passwordCorrect = !user
      ? false
      : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      const error = {
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid credentials',
        status: 401,
      }
      // TODO: Update error structure
      throw error
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    })

    res.status(200).send({ token, username: user.username })
  } catch (error) {
    next(error)
  }
})

export default loginRouter
