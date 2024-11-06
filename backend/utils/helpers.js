export const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

export const isEmailAddress = (string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string)
}

export const lastEmailSentRecently = (lastEmailSent) => {
  const now = Date.now()
  return lastEmailSent && now - lastEmailSent < 60 * 1000 // 1 minute in milliseconds
}

export const replacePlaceholders = (template, variables) => {
  return template.replace(/{{(.*?)}}/g, (_, key) => variables[key.trim()] || '')
}
