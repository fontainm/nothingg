import pg from 'pg'
import config from './utils/config.js'
import logger from './utils/logger.js'

const { Pool } = pg

const pool = new Pool({
  host: config.SQL_HOST,
  database: config.SQL_DATABASE,
  user: config.SQL_USER,
  password: config.SQL_PASSWORD,
})

export const query = async (text, params) => {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  logger.info('executed query', { text, duration, rows: res.rowCount })
  return res
}
