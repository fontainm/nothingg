import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    menuIsOpen: false
  }),

  actions: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen
    },

    closeMenu() {
      this.menuIsOpen = false
    }
  }
})
