import { validationResult } from 'express-validator'

const validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.code == '23505') {
    return res.status(400).send({ message: 'Username already taken' })
  }

  next(error)
}

export { errorHandler, validationHandler }
