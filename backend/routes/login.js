import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getUserByUsername, getUserByEmail } from '../controllers/users.js'
import { validationHandler } from '../utils/middleware.js'
import { userLoginRules } from '../validators/userValidator.js'

const loginRouter = express.Router()

const isEmailAddress = (string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string)
}

loginRouter.post(
  '/',
  userLoginRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const { username, password } = req.body

      const user = isEmailAddress(username)
        ? await getUserByEmail(username)
        : await getUserByUsername(username)

      const passwordCorrect = !user
        ? false
        : await bcrypt.compare(password, user.password)

      if (!(user && passwordCorrect)) {
        return res.error(null, 'Invalid username or password', 401)
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
      })

      delete user.password

      res.success({ token, ...user }, 'Login successful')
    } catch (error) {
      next(error)
    }
  }
)

export default loginRouter
