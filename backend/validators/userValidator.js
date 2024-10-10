import { body, param } from 'express-validator'

const userIdRules = () => {
  return [param('id').isInt().withMessage('User ID must be an integer')]
}

const userSignUpRules = () => {
  return [
    body('username')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ]
}

const userLoginRules = () => {
  return [body('password').notEmpty().withMessage('Password is required')]
}

export { userIdRules, userSignUpRules, userLoginRules }
