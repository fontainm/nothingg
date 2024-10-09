import { defineStore } from 'pinia'
import usersService from '../services/users'
import loginService from '../services/login'

export const useUsersStore = defineStore('user', {
  state: () => ({
    totalUsers: 0,
    username: null,
    token: null,
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
      this.user = response.username
      this.token = response.token
      this.isLoggedIn = true
      localStorage.setItem('user', JSON.stringify(response.token))
    },

    async logoutUser() {
      localStorage.removeItem('user')
      this.token = null
      this.username = null
      this.isLoggedIn = false
    }
  }
})
