import { defineStore } from 'pinia'
import productsService from '../services/products'

export const useAppStore = defineStore('app', {
  state: () => ({
    menuIsOpen: false,
    products: []
  }),

  actions: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
    },

    closeMenu() {
      this.menuIsOpen = false
    },

    async getProducts() {
      const response = await productsService.getProducts()
      this.products = response
    }
  }
})
