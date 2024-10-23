<script setup>
import SubmitButton from '@/components/SubmitButton.vue'
</script>

<template>
  <div class="login">
    <div class="container">
      <form @submit="handleLogin" class="form-small" :class="{ disabled: loading }">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <RouterLink to="/forgot-password" class="login-forgot">Forgot your password?</RouterLink>
        <SubmitButton text="Login" :loading="loading" />
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
      password: ''
    }
  },

  methods: {
    async handleLogin(event) {
      event.preventDefault()
      this.loading = true
      this.$appStore.resetInfoMessage()

      try {
        await this.$usersStore.loginUser({
          username: this.username,
          password: this.password
        })
        this.$router.push('/dashboard')
      } catch (error) {
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
