<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUsersStore } from '@/stores/users'
const usersStore = useUsersStore()
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
        <button v-if="usersStore.isLoggedIn" @click="usersStore.logoutUser()">Logout</button>
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
  mounted() {
    console.log('check login')
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
