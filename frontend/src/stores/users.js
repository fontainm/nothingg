import { defineStore } from 'pinia'
import userService from '../services/user'
import usersService from '../services/users'

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
      await userService.createUser({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password
      })
    },

    async loginUser(credentials) {
      const response = await userService.loginUser({
        username: credentials.username,
        password: credentials.password
      })
      this.setUser(response.data)
      this.setToken(response.data.token)
      return response
    },

    async updateUsername(username) {
      const response = await userService.updateUsername({
        username
      })
      this.user.username = response.username
    },

    async updateEmail(email) {
      const response = await userService.updateEmail({
        email
      })
      this.user.email = response.email
    },

    async updatePassword({ oldPassword, newPassword }) {
      await userService.updatePassword({
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
      const response = await userService.getMe()
      this.setUser(response)
    },

    async recoverPassword(email) {
      await userService.recoverPassword(email)
    },

    async resetPassword(token, password) {
      await userService.resetPassword(token, password)
    },

    async resendEmail(email) {
      await userService.resendEmail(email)
    },

    async verifyUser(token) {
      const user = await userService.verifyUser(token)
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
