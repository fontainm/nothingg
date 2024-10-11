<script setup>
import { RouterLink, RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <header>
    <nav v-if="$usersStore.isLoggedIn">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <button class="small" @click="handleLogout">Logout</button>
    </nav>
    <nav v-else>
      <RouterLink to="/#home">Home</RouterLink>
      <RouterLink to="/#howto">How?</RouterLink>
      <RouterLink to="/#benefits">Why?</RouterLink>
      <RouterLink to="/#features">Features</RouterLink>
      <RouterLink to="/#products">Products</RouterLink>
      <RouterLink to="/#faq">FAQ</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/demo">Demo</RouterLink>
    </nav>
  </header>

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
