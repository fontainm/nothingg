<script setup>
import IconMail from '~icons/mdi/email'
</script>

<template>
  <div class="signup">
    <div class="container">
      <div v-if="step === 0">
        <form @submit="handleSignUp" :class="{ disabled: loading }">
          <div class="signup-error error-message" :class="{ invisible: errorMessage === '' }">
            {{ errorMessage }}
          </div>
          <input v-model="username" type="text" placeholder="Username" />
          <input v-model="email" type="email" placeholder="Email address" />
          <input v-model="password" type="password" placeholder="Password" />
          <button type="submit"><span v-if="loading">...</span><span v-else>Sign Up</span></button>
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
        <p>I sent you an activation link. Use it to start enjoying Nothing!</p>
        <p>Didn't receive anything? <span class="link">Send the mail again</span></p>
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
      errorMessage: '',
      step: 0
    }
  },

  methods: {
    async handleSignUp(event) {
      event.preventDefault()
      this.loading = true
      this.errorMessage = ''

      try {
        await this.$usersStore.createUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.step = 1
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
@import '@/styles/variables.scss';

.signup {
  .signup-error {
  }

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
