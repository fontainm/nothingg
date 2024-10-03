import pg from 'pg'
import config from './utils/config.js'

const { Pool } = pg

const pool = new Pool({
  host: config.SQL_HOST,
  database: config.SQL_DATABASE,
  user: config.SQL_USER,
  password: config.SQL_PASSWORD
})

export const query = (text, params, callback) => {
  return pool.query(text, params, callback)
}
