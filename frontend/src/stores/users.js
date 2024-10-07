import { defineStore } from 'pinia'
import loginService from '../services/login'

export const useUsersStore = defineStore('user', {
  state: () => ({
    username: null,
    token: null,
    isLoggedIn: false
  }),

  actions: {
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
    }
  }
})
