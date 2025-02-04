<script setup>
import SubmitButton from '@/components/SubmitButton.vue'
</script>

<template>
  <section class="reset">
    <h2>Password reset</h2>
    <form class="form-small" @submit="handlePasswordReset">
      <input v-model="password" type="password" placeholder="New password" required />
      <input
        v-model="passwordConfirm"
        type="password"
        placeholder="Confirm new password"
        required
      />
      <SubmitButton text="Reset password" :loading="loading" />
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      password: '',
      passwordConfirm: ''
    }
  },

  methods: {
    async handlePasswordReset(event) {
      event.preventDefault()
      this.loading = true

      if (this.password !== this.passwordConfirm) {
        this.$appStore.showInfoMessage('error', 'Passwords do not match')
        this.loading = false
        return
      }

      try {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        await this.$usersStore.resetPassword(token, this.password)
        this.$router.push('/login')
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss';
</style>
