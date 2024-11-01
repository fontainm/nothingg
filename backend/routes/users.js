import express from 'express'
import { validationHandler, protectDeleteRoute } from '../utils/middleware.js'
import {
  userIdRules,
  userSignUpRules,
  usernameRules,
  emailRules,
  passwordUpdateRules,
} from '../validators/userValidator.js'
import {
  getUserById,
  getUserByToken,
  getUsers,
  getUsersCount,
  createUser,
  deleteUser,
  deleteUsers,
  updateUsername,
  updateEmail,
  updatePassword,
  verifyUser,
} from '../controllers/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs-extra'
import path from 'path'

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const replacePlaceholders = (template, variables) => {
  return template.replace(/{{(.*?)}}/g, (_, key) => variables[key.trim()] || '')
}

const transporter = nodemailer.createTransport({
  host: 'bootes.uberspace.de',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

const templatePath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  'templates',
  'verificationEmail.html'
)

const sendVerificationEmail = async (email, token) => {
  let template = await fs.readFile(templatePath, 'utf-8')

  const htmlContent = replacePlaceholders(template, {
    verificationUrl: `${process.env.DOMAIN}/users/verify?token=${token}`,
  })

  const mailOptions = {
    from: 'support@nothingg.space',
    to: email,
    subject: 'Verify Your Email',
    html: htmlContent,
  }
  await transporter.sendMail(mailOptions)
}

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await getUsers()
  res.success(users, 'Users fetched successfully')
})

usersRouter.get('/total', async (req, res) => {
  const total = await getUsersCount()
  res.success(total, 'Total users fetched successfully')
})

usersRouter.get('/me', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    const user = await getUserById(decodedToken.id)
    res.success(user, 'User fetched successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.get(
  '/:id',
  userIdRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await getUserById(id)
      if (user) {
        res.success(user, 'User fetched successfully')
      } else {
        res.error(null, 'User not found', 404)
      }
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.post(
  '/',
  usernameRules(),
  userSignUpRules(),
  validationHandler,
  async (req, res, next) => {
    const { username, email, password } = req.body
    try {
      const emailToken = uuidv4()
      const user = await createUser(username, email, password, emailToken)
      await sendVerificationEmail(email, emailToken)
      res.success(user, 'User created successfully', 201)
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.post('/verify', async (req, res, next) => {
  // TODO: Add rules & validation
  const emailToken = req.query.token
  try {
    const userToVerify = await getUserByToken(emailToken)
    if (!userToVerify) res.error(null, 'User not found', 404)
    if (userToVerify.confirmed)
      res.error(null, 'User has already been verified', 409)

    const user = await verifyUser(userToVerify.id)

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    })

    delete user.password

    res.success({ token, ...user }, 'User verified successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/resend-email', async (req, res, next) => {
  // TODO: Add rules & validation
  const { email, token } = req.body
  sendVerificationEmail(email, token)
})

usersRouter.put(
  '/username',
  usernameRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      const user = await getUserById(decodedToken.id)
      const response = await updateUsername(user.id, req.body.username)
      res.success(response, 'Username updated successfully')
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.put(
  '/email',
  emailRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      const user = await getUserById(decodedToken.id)
      const response = await updateEmail(user.id, req.body.email)
      res.success(response, 'Email updated successfully')
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.put(
  '/password',
  passwordUpdateRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      const user = await getUserById(decodedToken.id)

      const passwordCorrect = !user
        ? false
        : await bcrypt.compare(req.body.oldPassword, user.password)

      if (!(user && passwordCorrect)) {
        return res.error(null, 'Current password is not correct', 401)
      }

      await updatePassword(user.id, req.body.newPassword)
      res.success(null, 'Password successfully updated')
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.delete('/me', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    const user = await getUserById(decodedToken.id)

    const passwordCorrect = !user
      ? false
      : await bcrypt.compare(req.body.password, user.password)

    if (!(user && passwordCorrect)) {
      return res.error(null, 'Password is not correct', 401)
    }

    await deleteUser(user.id)
    res.success(null, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', protectDeleteRoute, async (req, res, next) => {
  try {
    await deleteUser(req.params.id)
    res.success(null, 'User deleted successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/', protectDeleteRoute, async (req, res) => {
  try {
    await deleteUsers()
    res.success(null, 'Users deleted successfully')
  } catch (error) {
    next(error)
  }
})

export default usersRouter
