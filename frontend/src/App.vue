<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav v-if="$usersStore.isLoggedIn">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <button @click="handleLogout">Logout</button>
    </nav>
    <nav v-else>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/#benefits">Benefits</RouterLink>
      <RouterLink to="/#products">Products</RouterLink>
      <RouterLink to="/signup">Sign Up</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/demo">Demo</RouterLink>
    </nav>
    <div></div>
  </header>

  <RouterView />

  <footer>
    <div>Footer</div>
  </footer>
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
nav {
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
}

footer {
  text-align: center;
  padding: 64px 0;
  background: lightseagreen;
}
</style>
