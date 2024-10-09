<script setup>
import { useUsersStore } from '../stores/users'
const usersStore = useUsersStore()
</script>

<template>
  <section class="intro" id="home">
    <div class="container">
      <h2>Nothing</h2>
      <p v-if="usersStore.isLoggedIn">Welcome {{ usersStore.user }}</p>
      <p v-else>Sign up now for nothing</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.intro {
  background-color: lightseagreen;
  text-align: center;
}
</style>
