import * as db from '../database.js'

export const clearDbUsers = async (api) => {
  console.log('clearing database...')
  await api.delete('/api/users')
  const resultAfter = await db.query('SELECT COUNT(*) FROM users')
  console.log(`Users after truncation: ${resultAfter.rows[0].count}`)
}

export const seedDbUsers = async (api) => {
  console.log('seeding database...')

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

  const resultAfter = await db.query('SELECT COUNT(*) FROM users')
  console.log(`Users after seeding: ${resultAfter.rows[0].count}`)
}
