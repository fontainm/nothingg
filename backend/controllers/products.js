import * as db from '../database.js'

export async function getProducts() {
  const { rows } = await db.query('SELECT * FROM products')
  return rows
}

export async function getProductById(id) {
  const { rows } = await db.query(`SELECT * FROM products WHERE id = $1`, [id])
  return rows[0]
}
