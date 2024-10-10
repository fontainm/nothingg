<template>
  <section class="signup">
    <div class="container">
      <div>
        {{ errorMessage }}
      </div>
      <form @submit="handleSignUp">
        <input v-model="username" type="text" placeholder="Username" />
        <input v-model="email" type="email" placeholder="Email address" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    }
  },

  methods: {
    async handleSignUp() {
      event.preventDefault()
      this.errorMessage = ''

      try {
        await this.$usersStore.createUser({
          username: this.username,
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.errorMessage = error.response.data.message
      }
    }
  }
}
</script>

<style scoped lang="scss">
.signup {
  text-align: center;
}
</style>
