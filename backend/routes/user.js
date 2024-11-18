import express from 'express'
import { protectRoute, validationHandler } from '../utils/middleware.js'
import {
  getTokenFrom,
  isEmailAddress,
  lastEmailSentRecently,
} from '../utils/helpers.js'
import {
  sendVerificationEmail,
  sendPasswordRecoveryEmail,
  sendEmailChangeVerificationEmail,
} from '../utils/email.js'
import {
  usernameRules,
  emailRules,
  verifyTokenRules,
  passwordUpdateRules,
  userLoginRules,
  passwordRules,
} from '../validators/userValidator.js'
import {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByToken,
  getUserByUsername,
  deleteUser,
  updateUsername,
  setEmailChangeToken,
  updateEmail,
  updatePassword,
  verifyUser,
  setPasswordResetToken,
  unsetPasswordResetToken,
} from '../controllers/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const userRouter = express.Router()

userRouter.get('/me', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    const user = await getUserById(decodedToken.id)
    res.success(user, 'User fetched successfully')
  } catch (error) {
    next(error)
  }
})

userRouter.post(
  '/signup',
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

userRouter.post(
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

userRouter.post(
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

      res.success({ token, ...user }, 'Email verified successfully')
    } catch (error) {
      next(error)
    }
  }
)

userRouter.post(
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

      if (lastEmailSentRecently(user.last_email_sent)) {
        return res.error(
          null,
          'Please wait before requesting another email',
          429
        )
      }

      await sendVerificationEmail(email, user.verify_token)
      res.success(null, 'Mail sent successfully')
    } catch (error) {
      next(error)
    }
  }
)

userRouter.post(
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

      if (lastEmailSentRecently(user.last_email_sent)) {
        return res.error(
          null,
          'Please wait before requesting another email',
          429
        )
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
      res.success({ resetToken }, 'Mail sent successfully')
    } catch (error) {
      next(error)
    }
  }
)

userRouter.post(
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
        return res.error(null, 'Invalid or expired token', 400)
      }

      const tokenCorrect = await bcrypt.compare(
        token,
        user.password_reset_token
      )

      if (!tokenCorrect) {
        return res.error(null, 'Invalid or expired token', 400)
      }

      await updatePassword(user.id, password)
      await unsetPasswordResetToken(user.id)
      res.success(null, 'Password successfully reset')
    } catch (error) {
      next(error)
    }
  }
)

userRouter.put(
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

userRouter.post(
  '/change-email',
  emailRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const newEmail = req.body.email
      const emailToken = uuidv4()
      const expirationDate = new Date(Date.now() + 3600000)
      const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
      await setEmailChangeToken(
        decodedToken.id,
        newEmail,
        emailToken,
        expirationDate
      )
      await sendEmailChangeVerificationEmail(newEmail, emailToken)
      res.success({ emailToken }, 'Please verify your new email address')
    } catch (error) {
      next(error)
    }
  }
)

userRouter.post(
  '/verify-change-email',
  verifyTokenRules(),
  validationHandler,
  async (req, res, next) => {
    try {
      const emailToken = req.query.token
      const user = await getUserByToken(emailToken)
      if (!user) return res.error(null, 'User not found', 404)
      if (!user.new_email || user.verify_token_expires < new Date()) {
        return res.error(null, 'Invalid or expired token', 400)
      }

      const response = await updateEmail(user.id, user.new_email)
      res.success(response, 'Email updated successfully')
    } catch (error) {
      next(error)
    }
  }
)

userRouter.put(
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

userRouter.delete('/me', async (req, res, next) => {
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

export default userRouter
