<script setup>
import { useUsersStore } from '../stores/users'
</script>

<template>
  <section class="login">
    <div class="container">
      <div>
        {{ errorMessage }}
      </div>
      <form @submit="handleLogin">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      usersStore: useUsersStore()
    }
  },

  methods: {
    async handleLogin() {
      event.preventDefault()
      this.errorMessage = ''

      try {
        await this.usersStore.loginUser({ username: this.username, password: this.password })
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  text-align: center;
}
</style>
