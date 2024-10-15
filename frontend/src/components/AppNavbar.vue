<template>
  <header>
    <nav v-if="$usersStore.isLoggedIn" class="container">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <button class="btn btn-small" @click="handleLogout">Logout</button>
    </nav>
    <nav v-else class="container">
      <div>
        <RouterLink to="/#home">Home</RouterLink>
        <RouterLink to="/#howto">How it works</RouterLink>
        <RouterLink to="/#features">Features</RouterLink>
        <RouterLink to="/#products">Products</RouterLink>
        <RouterLink to="/#faq">FAQ</RouterLink>
      </div>
      <div>
        <RouterLink to="/signup" class="btn btn-small">Start for free</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/demo">Demo</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$usersStore.logoutUser()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

header {
  height: 60px;
  border-bottom: 1px solid $primary-color;
  top: 0;
  z-index: 10;
  width: 100%;
  position: fixed;
  justify-content: space-around;
  background: white;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  a {
    transition: all 0.25s ease;

    &:not(:last-child) {
      margin-right: 32px;
    }

    &:not(.btn):hover {
      color: $primary-color;
    }
  }
}
</style>
