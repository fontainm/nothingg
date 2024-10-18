<template>
  <div class="login">
    <div class="container">
      <form @submit="handleLogin" class="form-small" :class="{ disabled: loading }">
        <div class="login-error error-message" :class="{ invisible: errorMessage === '' }">
          {{ errorMessage }}
        </div>
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <RouterLink to="/forgot-password" class="login-forgot">Forgot your password?</RouterLink>
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      username: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    async handleLogin(event) {
      event.preventDefault()
      this.loading = true
      this.errorMessage = ''

      try {
        await this.$usersStore.loginUser({ username: this.username, password: this.password })
        this.$router.push('/dashboard')
      } catch (error) {
        this.errorMessage = error.response.data.errors[0].msg
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  .login-forgot {
    margin-bottom: 16px;
    font-size: 14px;
  }
}
</style>
