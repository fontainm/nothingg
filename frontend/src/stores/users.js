import { defineStore } from 'pinia'
import usersService from '../services/users'
import loginService from '../services/login'

export const useUsersStore = defineStore('user', {
  state: () => ({
    totalUsers: 0,
    user: null,
    isLoggedIn: false,
    token: null
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
      this.setUser(response.data)
      this.setToken(response.data.token)
      return response
    },

    async updateUsername(username) {
      const response = await usersService.updateUsername({
        username
      })
      this.user.username = response.username
    },

    async updateEmail(email) {
      const response = await usersService.updateEmail({
        email
      })
      this.user.email = response.email
    },

    async updatePassword({ oldPassword, newPassword }) {
      await usersService.updatePassword({
        oldPassword,
        newPassword
      })
    },

    async deleteUser(password) {
      await usersService.deleteUser({ password })
    },

    async fetchUser() {
      const token = localStorage.getItem('nothing_token')
      if (!token) return
      if (token === 'demotoken') return this.setDemoUser()
      this.setToken(token)
      const response = await usersService.getMe()
      this.setUser(response)
    },

    async resendEmail(email) {
      await usersService.resendEmail(email)
    },

    async verifyUser(token) {
      const user = await usersService.verifyUser(token)
      this.setUser(user)
      this.setToken(user.token)
    },

    logoutUser() {
      this.user = null
      this.isLoggedIn = false
      this.token = null
      localStorage.removeItem('nothing_token')
    },

    setDemoUser() {
      const demoUser = {
        id: 0,
        username: 'demo',
        email: 'demo',
        created_at: new Date(),
        product_id: 1,
        isDemoUser: true
      }
      this.setUser(demoUser)
      this.setToken('demotoken')
    },

    setUser(user) {
      this.user = user
      this.isLoggedIn = true
    },

    setToken(token) {
      localStorage.setItem('nothing_token', token)
      this.token = `Bearer ${token}`
    }
  }
})
