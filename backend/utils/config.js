import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const PORT = process.env.PORT || 3001
const SQL_HOST = process.env.SQL_HOST
const SQL_DATABASE = process.env.SQL_DATABASE
const SQL_USER = process.env.SQL_USER
const SQL_PASSWORD = process.env.SQL_PASSWORD

export default {
  PORT,
  SQL_HOST,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD,
}
