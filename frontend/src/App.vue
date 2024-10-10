<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/users'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/#home">Home</RouterLink>
      <RouterLink to="/#benefits">Benefits</RouterLink>
      <RouterLink to="/#products">Products</RouterLink>
      <div>
        <RouterLink v-if="!usersStore.isLoggedIn" to="/signup">Sign Up</RouterLink>
        <RouterLink v-if="!usersStore.isLoggedIn" to="/login">Login</RouterLink>
        <RouterLink v-if="!usersStore.isLoggedIn" to="/demo">Demo</RouterLink>
        <button v-if="usersStore.isLoggedIn" @click="handleLogout">Logout</button>
      </div>
    </nav>
  </header>

  <RouterView />

  <footer>
    <div>Footer</div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      usersStore: useUsersStore()
    }
  },

  mounted() {
    console.log('check login')
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.usersStore.setUser(user)
    }
  },

  methods: {
    handleLogout() {
      this.usersStore.logoutUser()
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
