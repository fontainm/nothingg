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
    return res.status(400).send({
      errors: [
        {
          value: req.body.username,
          msg: 'Username already taken',
          type: 'field',
          path: 'username',
        },
      ],
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({
      errors: [
        {
          msg: 'Invalid Token',
        },
      ],
    })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      errors: [
        {
          msg: 'Token expired',
        },
      ],
    })
  }

  next(error)
}

export { errorHandler, validationHandler }
