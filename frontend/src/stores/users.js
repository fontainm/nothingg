import { defineStore } from 'pinia'
import usersService from '../services/users'
import loginService from '../services/login'

export const useUsersStore = defineStore('user', {
  state: () => ({
    totalUsers: 0,
    user: null,
    isLoggedIn: false
  }),

  actions: {
    async getTotalUsers() {
      const response = await usersService.countAll()
      this.totalUsers = response.total
    },

    async createUser(credentials) {
      await usersService.createUser({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      })
    },

    async loginUser(credentials) {
      const response = await loginService.login({
        username: credentials.username,
        password: credentials.password
      })
      this.setUser(response)
      localStorage.setItem('user', JSON.stringify(response))
    },

    logoutUser() {
      this.user = null
      this.isLoggedIn = false
      localStorage.removeItem('user')
    },

    setUser(user) {
      this.user = user
      this.isLoggedIn = true
    }
  }
})
