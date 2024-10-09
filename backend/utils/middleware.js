const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.code == '23505') {
    return res.status(400).send({ message: 'Username already taken' })
  }

  if (error.code == 'INVALID_CREDENTIALS') {
    return res.status(401).send({ message: 'Invalid username or password' })
  }

  next(error)
}

export { errorHandler }
