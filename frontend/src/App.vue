<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/#home">Home</RouterLink>
      <RouterLink to="/#benefits">Benefits</RouterLink>
      <RouterLink to="/#products">Products</RouterLink>
      <div>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/demo">Demo</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />

  <footer>
    <div>Footer</div>
  </footer>
</template>

<style scoped lang="scss">
nav {
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
}

footer {
  text-align: center;
  padding: 64px 0;
}
</style>
