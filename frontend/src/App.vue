<script setup>
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <AppNavbar />

  <div class="content">
    <RouterView />
  </div>

  <AppFooter />
</template>

<script>
export default {
  mounted() {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.$usersStore.setUser(user)
    }
    this.$appStore.getProducts()
  },

  methods: {
    handleLogout() {
      this.$usersStore.logoutUser()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

nav {
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  background: white;
  top: 0;
  height: 60px;
  z-index: 10;
  border-bottom: 1px solid $primary-color;
}

.content {
  margin-top: 60px;
}
</style>
