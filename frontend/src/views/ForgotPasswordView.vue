<script setup>
import SubmitButton from '@/components/SubmitButton.vue'
import IconMail from '~icons/mdi/email'
</script>

<template>
  <section class="forgot">
    <h2>Password recovery</h2>
    <div v-if="step === 0">
      <form class="form-small" @submit="handlePasswordRecovery">
        <input v-model="email" type="email" placeholder="Email address" required />
        <SubmitButton text="Recover password" :loading="loading" />
      </form>
    </div>
    <div v-else-if="step === 1" class="forgot-confirm">
      <IconMail class="icon-lg" />
      <h3>Check your mail</h3>
      <p>You should receive a link to reset your password. Please also check your spam folder.</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      email: '',
      step: 0
    }
  },

  methods: {
    async handlePasswordRecovery(event) {
      event.preventDefault()
      this.loading = true
      try {
        await this.$usersStore.recoverPassword({ email: this.email })
        this.step = 1
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
