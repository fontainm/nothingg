<script setup>
import SubmitButton from '@/components/SubmitButton.vue'
import IconMail from '~icons/mdi/email'
</script>

<template>
  <div class="signup">
    <div class="container">
      <div v-if="step === 0">
        <form @submit="handleSignUp" class="form-small" :class="{ disabled: loading }">
          <input v-model="username" type="text" placeholder="Username" />
          <input v-model="email" type="email" placeholder="Email address" />
          <input v-model="password" type="password" placeholder="Password" />
          <SubmitButton text="Sign Up" :loading="loading" />
        </form>
        <div class="signup-login">
          <p>
            Already have an account?
            <RouterLink to="/login">Login</RouterLink>
          </p>
        </div>
      </div>
      <div v-else-if="step === 1" class="signup-confirm">
        <IconMail class="icon-lg" />
        <h3>Check your mail</h3>
        <p>
          I sent you an activation link. Use it to start enjoying {{ $appStore.appTitle }}! You
          might need to check your spam folder as well.
        </p>
        <p>
          Didn't receive anything?
          <span class="link" :class="{ disabled: loading }" @click="handleResendEmail">
            Send the mail again
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      username: '',
      email: '',
      password: '',
      step: 0
    }
  },

  methods: {
    async handleSignUp(event) {
      event.preventDefault()
      this.loading = true

      try {
        await this.$usersStore.createUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.step = 1
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    },

    async handleResendEmail() {
      this.loading = true

      try {
        await this.$usersStore.resendEmail({
          email: this.email
        })
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.signup {
  .signup-login {
    margin-top: 16px;
  }

  .signup-confirm {
    p,
    h3 {
      margin-bottom: 16px;
    }
  }
}
</style>
