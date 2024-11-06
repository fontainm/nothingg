import express from 'express'
import {
  protectRoute,
  validationHandler,
  protectDeleteRoute,
} from '../utils/middleware.js'
import { getTokenFrom, isEmailAddress } from '../utils/helpers.js'
import {
  sendVerificationEmail,
  sendPasswordRecoveryEmail,
} from '../utils/email.js'
import {
  userIdRules,
  usernameRules,
  emailRules,
  verifyTokenRules,
  passwordUpdateRules,
  userLoginRules,
  passwordRules,
} from '../validators/userValidator.js'
import {
  getUserById,
  getUserByEmail,
  getUserByToken,
  getUserByUsername,
  getUsers,
  getUsersCount,
  createUser,
  deleteUser,
  deleteUsers,
  updateUsername,
  updateEmail,
  updatePassword,
  verifyUser,
  setPasswordResetToken,
  unsetPasswordResetToken,
} from '../controllers/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const usersRouter = express.Router()

usersRouter.get('/', protectRoute, async (req, res, next) => {
  try {
    const users = await getUsers()
    res.success(users, 'Users fetched successfully')
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/total', protectRoute, async (req, res, next) => {
  try {
    const total = await getUsersCount()
    res.success(total, 'Total users fetched successfully')
  } catch (error) {
    next(error)
  }
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
  protectRoute,
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
  protectRoute,
  usernameRules(),
  emailRules(),
  passwordRules(),
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

usersRouter.post(
  '/login',
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

usersRouter.post(
  '/verify',
  verifyTokenRules(),
  validationHandler,
  async (req, res, next) => {
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
  }
)

usersRouter.post(
  '/resend-email',
  protectRoute,
  emailRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const { email } = req.body
      const user = await getUserByEmail(email)
      if (!user) {
        return res.error(null, 'User not found', 404)
      }
      await sendVerificationEmail(email, user.verify_token)
      res.success(null, 'Mail sent successfully')
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.post(
  '/recover-password',
  protectRoute,
  emailRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const { email } = req.body
      const user = await getUserByEmail(email)
      if (!user) {
        return res.error(null, 'User not found', 404)
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      }

      const resetToken = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: 60 * 60,
      })

      const hashedToken = await bcrypt.hash(resetToken, 10)
      const expirationDate = new Date(Date.now() + 3600000)

      await setPasswordResetToken(hashedToken, expirationDate, user.id)

      await sendPasswordRecoveryEmail(email, resetToken)
      res.success(null, 'Mail sent successfully')
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.post(
  '/reset-password',
  passwordRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const { token, password } = req.body
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const user = await getUserById(decodedToken.id)

      if (
        !user ||
        !user.password_reset_token ||
        user.password_reset_expires < new Date()
      ) {
        return res.error(null, 'Invalid or expired token')
      }

      const tokenCorrect = await bcrypt.compare(
        token,
        user.password_reset_token
      )

      if (!tokenCorrect) {
        return res.error(null, 'Invalid or expired token')
      }

      await updatePassword(user.id, password)
      await unsetPasswordResetToken(user.id)
      res.success(null, 'Password successfully reset')
    } catch (error) {
      next(error)
    }
  }
)

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

usersRouter.delete('/', protectDeleteRoute, async (req, res, next) => {
  try {
    await deleteUsers()
    res.success(null, 'Users deleted successfully')
  } catch (error) {
    next(error)
  }
})

export default usersRouter
