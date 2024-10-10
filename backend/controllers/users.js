import * as db from '../database.js'
import bcrypt from 'bcrypt'

export async function getUsers() {
  const { rows } = await db.query(
    'SELECT id, username, email, created_at, password FROM users'
  )
  return rows
}

export async function getUsersCount() {
  const { rows } = await db.query('SELECT COUNT(*) as total FROM users')
  return rows[0]
}

export async function getUserById(id) {
  const { rows } = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
  return rows[0]
}

export async function getUserByUsername(username) {
  const { rows } = await db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ])
  return rows[0]
}

export async function createUser(username, email, password) {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const created_at = new Date()
  const result = await db.query(
    `INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
    [username, email, passwordHash, created_at]
  )
  return {
    id: result.rows[0].id,
    username,
    email,
  }
}

export async function deleteUsers() {
  await db.query('TRUNCATE TABLE users')
  await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')
}
