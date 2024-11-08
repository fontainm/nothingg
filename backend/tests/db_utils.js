import { pool } from '../database.js'

export const clearDbUsers = async (api) => {
  console.log('Clearing users table...')
  await api.delete('/api/users')
}

export const seedDbUsers = async (api) => {
  console.log('Seeding users table...')
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

export const endPool = async () => {
  console.log('Ending pool...')
  await pool.end()
}
