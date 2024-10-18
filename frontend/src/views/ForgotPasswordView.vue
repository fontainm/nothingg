<script setup>
import IconMail from '~icons/mdi/email'
</script>

<template>
  <section class="forgot">
    <h2>Password recovery</h2>
    <div v-if="step === 0">
      <form class="form-small" @submit="handlePasswordRecovery">
        <input v-model="email" type="email" placeholder="Email address" />
        <button type="submit">Recover password</button>
      </form>
    </div>
    <div v-else-if="step === 1" class="forgot-confirm">
      <IconMail class="icon-lg" />
      <h3>Check your mail</h3>
      <p>I sent you a new password.</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      step: 0
    }
  },

  methods: {
    handlePasswordRecovery(event) {
      event.preventDefault()
      // TODO: Recover password
      this.step = 1
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.forgot {
}
</style>
