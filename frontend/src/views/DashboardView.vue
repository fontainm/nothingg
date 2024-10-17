<template>
  <section v-if="user" class="dashboard">
    <h2>Welcome to nothing!</h2>
    <ul>
      <li>ID: {{ user.id }}</li>
      <li>Username: {{ user.username }}</li>
      <li>Email: {{ user.email }}</li>
      <li>Member since: {{ user.created_at }}</li>
      <li>Email confirmed: {{ user.confirmed }}</li>
      <li>Product: {{ user.product }}</li>
    </ul>
    <button class="btn btn-small">Delete account</button>
  </section>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$usersStore.user
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard {
}
</style>
