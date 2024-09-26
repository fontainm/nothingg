import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  })
  .promise()

export async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM users')
  return rows
}

export async function getUser(id) {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
  return rows[0]
}

export async function createUser(email, password) {
  const [result] = await pool.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [
    email,
    password
  ])
  return {
    id: result.insertId,
    email,
    password
  }
}
