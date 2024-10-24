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

    async deleteUser() {
      await usersService.deleteUser(this.user.id)
    },

    async fetchUser() {
      const token = localStorage.getItem('nothing_token')
      if (!token) return
      this.setToken(token)
      const response = await usersService.getMe()
      this.setUser(response)
    },

    logoutUser() {
      this.user = null
      this.isLoggedIn = false
      this.token = null
      localStorage.removeItem('nothing_token')
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
