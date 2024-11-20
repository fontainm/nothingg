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

export async function isEmailInUse(email) {
  const result = await db.query(
    `SELECT COUNT(*) FROM users WHERE email = $1 OR new_email = $1`,
    [email]
  )
  return result.rows[0].count > 0
}

export async function setEmailChangeToken(id, newEmail, token, expirationDate) {
  const { rows } = await db.query(
    `UPDATE users SET new_email = $1, verify_token = $2, verify_token_expires = $3 WHERE id = $4`,
    [newEmail, token, expirationDate, id]
  )
  return rows[0]
}

export async function updateEmail(id, email) {
  const { rows } = await db.query(
    `UPDATE users SET email = $1, new_email = NULL WHERE id = $2 RETURNING email`,
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

export async function upgradeUser(id) {
  const { rows } = await db.query(
    `UPDATE users SET product_id = 2 WHERE id = $1`,
    [id]
  )
  return rows[0]
}

export async function createPayment(session) {
  const { rows } = await db.query(
    `INSERT INTO payments (user_id, product_id, amount, status, stripe_payment_intent_id, stripe_session_id)
    VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      session.metadata.userId,
      session.metadata.productId || 2,
      session.amount_total,
      session.payment_status,
      session.payment_intent,
      session.id,
    ]
  )
  return rows[0]
}

export async function deleteUser(id) {
  await db.query('DELETE FROM users WHERE id = $1', [id])
}

export async function deleteUsers() {
  await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
}
