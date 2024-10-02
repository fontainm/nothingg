import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const Pool = pg.Pool

const pool = new Pool({
  host: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD
})

export async function getUsers() {
  const { rows } = await pool.query('SELECT * FROM users')
  return rows
}

export async function getUser(id) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id])
  return rows[0]
}

export async function createUser(username, email, password) {
  const created_at = new Date()
  const result = await pool.query(
    `INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
    [username, email, password, created_at]
  )
  return {
    id: result.rows[0].id,
    username,
    email,
    password
  }
}
