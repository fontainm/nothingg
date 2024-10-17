<script setup>
import IconMail from '~icons/mdi/email'
</script>

<template>
  <div class="signup">
    <div class="container">
      <div v-if="step === 0">
        <div>
          {{ errorMessage }}
        </div>
        <form @submit="handleSignUp">
          <input v-model="username" type="text" placeholder="Username" />
          <input v-model="email" type="email" placeholder="Email address" />
          <input v-model="password" type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
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
      this.errorMessage = ''

      try {
        await this.$usersStore.createUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.step = 1
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
