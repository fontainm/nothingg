<template>
  <div class="login">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    async handleLogin() {
      event.preventDefault()
      this.errorMessage = ''

      try {
        await this.$usersStore.loginUser({ username: this.username, password: this.password })
        this.$router.push('/dashboard')
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
}
</style>
