import dotenv from 'dotenv'

dotenv.config({ path: `.env.local`, override: true })

const PORT = process.env.PORT
const HOST = process.env.SQL_HOST
const SQL_DATABASE = process.env.SQL_DATABASE
const SQL_USER = process.env.SQL_USER
const SQL_PASSWORD = process.env.SQL_PASSWORD

export default {
  PORT,
  HOST,
  SQL_DATABASE,
  SQL_USER,
  SQL_PASSWORD
}
