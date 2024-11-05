export const isEmailAddress = (string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string)
}

export const replacePlaceholders = (template, variables) => {
  return template.replace(/{{(.*?)}}/g, (_, key) => variables[key.trim()] || '')
}
