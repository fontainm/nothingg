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
      try {
        const response = await usersService.createUser({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password
        })
        console.log(response)
      } catch (error) {
        console.error('Sign Up failed:', error)
        throw error // Throw the error so the component can handle it
      }
    },

    async loginUser(credentials) {
      try {
        const response = await loginService.login({
          username: credentials.username,
          password: credentials.password
        })
        console.log(response)
        this.user = response.username
        this.token = response.token
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(response.token))
      } catch (error) {
        console.error('Login failed:', error)
        throw error // Throw the error so the component can handle it
      }
    },

    async logoutUser() {
      localStorage.removeItem('user')
      this.token = null
      this.username = null
      this.isLoggedIn = false
    }
  }
})
