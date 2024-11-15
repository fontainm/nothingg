import * as db from '../database.js'
import bcrypt from 'bcrypt'

export async function getUsers() {
  const { rows } = await db.query(
    'SELECT id, username, email, created_at, confirmed FROM users'
  )
  return rows
}

export async function getUsersCount() {
  const { rows } = await db.query('SELECT COUNT(*) as total FROM users')
  return rows[0]
}

export async function getUserById(id) {
  const { rows } = await db.query(
    `SELECT id, username, password, product_id, confirmed, created_at, email, password_reset_token, password_reset_expires, last_email_sent FROM users WHERE id = $1`,
    [id]
  )
  return rows[0]
}

export async function getUserByUsername(username) {
  const { rows } = await db.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ])
  return rows[0]
}

export async function getUserByToken(token) {
  const { rows } = await db.query(
    `SELECT * FROM users WHERE verify_token = $1`,
    [token]
  )
  return rows[0]
}

export async function getUserByEmail(email) {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ])
  return rows[0]
}

export async function createUser(username, email, password, verify_token) {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const created_at = new Date()
  const result = await db.query(
    `INSERT INTO users (username, email, password, verify_token, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [username, email, passwordHash, verify_token, created_at]
  )
  return {
    id: result.rows[0].id,
    username,
    email,
    verify_token,
  }
}

export async function updateUsername(id, username) {
  const { rows } = await db.query(
    `UPDATE users SET username = $1 WHERE id = $2 RETURNING *`,
    [username, id]
  )
  return rows[0]
}

export async function updateEmail(id, email) {
  const { rows } = await db.query(
    `UPDATE users SET email = $1 WHERE id = $2 RETURNING email`,
    [email, id]
  )
  return rows[0]
}

export async function updatePassword(id, password) {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const { rows } = await db.query(
    `UPDATE users SET password = $1 WHERE id = $2`,
    [passwordHash, id]
  )
  return rows[0]
}

export async function updateUserLastEmailSent(email) {
  const now = new Date()
  const { rows } = await db.query(
    `UPDATE users SET last_email_sent = $1 WHERE email = $2`,
    [now, email]
  )
  return rows[0]
}

export async function verifyUser(id) {
  const { rows } = await db.query(
    `UPDATE users SET confirmed = true WHERE id = $1 RETURNING *`,
    [id]
  )
  return rows[0]
}

export async function setPasswordResetToken(hashedToken, expirationDate, id) {
  const { rows } = await db.query(
    `UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3`,
    [hashedToken, expirationDate, id]
  )
  return rows[0]
}

export async function unsetPasswordResetToken(id) {
  const { rows } = await db.query(
    `UPDATE users SET password_reset_token = NULL, password_reset_expires = NULL WHERE id = $1`,
    [id]
  )
  return rows[0]
}

export async function deleteUser(id) {
  await db.query('DELETE FROM users WHERE id = $1', [id])
}

export async function deleteUsers() {
  await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
}
