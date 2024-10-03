import * as db from '../database.js'

export async function getUsers() {
  const { rows } = await db.query('SELECT id, username, email, created_at FROM users')
  return rows
}

export async function getUsersCount() {
  const { rows } = await db.query('SELECT COUNT(*) as total FROM users')
  return rows[0]
}

export async function getUser(id) {
  const { rows } = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
  return rows[0]
}

export async function createUser(username, email, password) {
  const created_at = new Date()
  const result = await db.query(
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
