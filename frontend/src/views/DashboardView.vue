<template>
  <section class="dashboard">
    <h2>Welcome to nothing!</h2>
    <ul>
      <li>ID: {{ user.id }}</li>
      <li>Username: {{ user.username }}</li>
      <li>Email: {{ user.email }}</li>
      <li>Member since: {{ user.created_at }}</li>
    </ul>
    <button>Subscribe now!</button>
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

<style lang="scss">
.dashboard {
  text-align: center;
}
</style>
