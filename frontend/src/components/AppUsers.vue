<script setup>
import usersService from '@/services/users'
</script>

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
  data() {
    return {
      totalUsers: 0
    }
  },

  mounted() {
    this.countUsers()
  },

  methods: {
    async countUsers() {
      const response = await usersService.countAll()
      this.totalUsers = response.total
    }
  }
}
</script>

<style scoped lang="scss">
.users {
  text-align: center;
}
</style>
