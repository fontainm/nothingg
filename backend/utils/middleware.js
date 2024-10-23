import { validationResult } from 'express-validator'

const validationHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const firstErrorMessage = errors.array()[0].msg
    return res.error(errors.array(), firstErrorMessage, 400)
  }
  next()
}

const createResponse = (
  status,
  success,
  message,
  data = null,
  error = null
) => {
  return {
    status,
    success,
    message,
    data,
    error,
  }
}

const responseHandler = (req, res, next) => {
  res.success = (data, message = 'Operation successful', status = 200) => {
    res.status(status).json(createResponse(status, true, message, data, null))
  }

  res.error = (error, message = 'An error occurred', status = 500) => {
    res.status(status).json(createResponse(status, false, message, null, error))
  }

  next()
}

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.code == '23505') {
    return res.error(error, 'Username already taken', 400)
  } else if (error.name === 'JsonWebTokenError') {
    return res.error(error, 'Invalid token', 401)
  } else if (error.name === 'TokenExpiredError') {
    return res.error(error, 'Token expired', 401)
  }

  next(error)
}

export { errorHandler, validationHandler, responseHandler }
