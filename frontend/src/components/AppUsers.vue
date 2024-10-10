<template>
  <section class="users">
    <div class="container">
      <h2>Our Users</h2>
      <p>{{ totalUsers }} users signed up!</p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    totalUsers() {
      return this.$usersStore.totalUsers
    }
  },

  mounted() {
    if (!this.totalUsers) {
      this.countUsers()
    }
  },

  methods: {
    async countUsers() {
      this.$usersStore.getTotalUsers()
    }
  }
}
</script>

<style scoped lang="scss">
.users {
  text-align: center;
}
</style>
