import { defineStore } from 'pinia'
import productsService from '../services/products'

export const useAppStore = defineStore('app', {
  state: () => ({
    appTitle: 'Nothingg',
    appDomain: 'nothingg.space',
    menuIsOpen: false,
    infoMessage: null,
    timeout: null,
    products: []
  }),

  actions: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
    },

    closeMenu() {
      this.menuIsOpen = false
    },

    showInfoMessage(type, message) {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.infoMessage = {
        type,
        message
      }
      this.timeout = setTimeout(() => {
        this.resetInfoMessage()
      }, 5000)
    },

    resetInfoMessage() {
      this.infoMessage = null
    },

    async getProducts() {
      const response = await productsService.getProducts()
      this.products = response
    }
  }
})
