import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const PORT = process.env.PORT || 3001
const SQL_HOST = process.env.SQL_HOST
const SQL_DATABASE = process.env.SQL_DATABASE
const SQL_USER = process.env.SQL_USER
const SQL_PASSWORD = process.env.SQL_PASSWORD
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY
const STRIPE_SIGNING_SECRET = process.env.STRIPE_SIGNING_SECRET

export default {
  PORT,
  SQL_HOST,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
  STRIPE_PRIVATE_KEY,
  STRIPE_SIGNING_SECRET,
}
