import * as db from '../database.js'

export const clearDbUsers = async (api) => {
  // await api.delete('/api/users')
  await db.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await db.query('ALTER SEQUENCE users_id_seq RESTART WITH 1') // Manually reset sequence
  const resultAfter = await db.query('SELECT COUNT(*) FROM users')
  console.log(`Users after truncation: ${resultAfter.rows[0].count}`)
}

export const seedDbUsers = async (api) => {
  const users = [
    {
      email: 'test1@example.com',
      username: 'testuser1',
      password: 'hashedpassword1',
    },
    {
      email: 'test2@example.com',
      username: 'testuser2',
      password: 'hashedpassword2',
    },
    {
      email: 'test3@example.com',
      username: 'testuser3',
      password: 'hashedpassword3',
    },
  ]

  for (const user of users) {
    await api
      .post('/api/user/signup')
      .set('x-auth-token', process.env.AUTH_TOKEN)
      .send(user)
  }
}
