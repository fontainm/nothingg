import { body, param, query } from 'express-validator'

const userIdRules = () => {
  return [param('id').isInt().withMessage('User ID must be an integer')]
}

const usernameRules = () => {
  return [
    body('username')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be between 3 and 20 characters.')
      .matches(/^[a-zA-Z0-9._]+$/)
      .withMessage(
        'Username can only contain letters, numbers, underscores, and dots.'
      )
      .matches(/^(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)
      .withMessage(
        'Username cannot have consecutive dots or underscores, and cannot start or end with them.'
      ),
  ]
}

const emailRules = () => {
  return [
    body('email').isEmail().withMessage('Please provide a valid email address'),
  ]
}

const verifyTokenRules = () => {
  return [
    query('token')
      .not()
      .isEmpty()
      .isUUID(4)
      .withMessage('Invalid verification token format.'),
  ]
}

const passwordRules = () => {
  return [
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ]
}

const passwordUpdateRules = () => {
  return [
    body('oldPassword').not().isEmpty(),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ]
}

const userLoginRules = () => {
  return [
    body('username').notEmpty().withMessage('Username or email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]
}

export {
  userIdRules,
  userLoginRules,
  usernameRules,
  emailRules,
  passwordRules,
  verifyTokenRules,
  passwordUpdateRules,
}
