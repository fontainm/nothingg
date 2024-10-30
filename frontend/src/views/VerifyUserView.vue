<script setup></script>

<template>
  <div class="verify">
    <h3>Verifying your email...</h3>
    <div class="spinner spinner-lg"></div>
  </div>
</template>

<script>
export default {
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      try {
        await this.$usersStore.verifyUser(token)
        this.$router.push('/dashboard')
      } catch (error) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.verify {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h3 {
    margin-bottom: 32px;
  }
}
</style>
