<script setup>
import IconBurgerMenu from '~icons/mdi/menu'
</script>

<template>
  <div class="navbar">
    <nav class="container">
      <RouterLink to="/" class="app-title navbar-title">Nothing</RouterLink>
      <div class="navbar-items" :class="{ open: $appStore.menuIsOpen }">
        <RouterLink to="/#howto">How it works</RouterLink>
        <RouterLink to="/#features">Features</RouterLink>
        <RouterLink to="/#products">Products</RouterLink>
        <RouterLink to="/#faq">FAQ</RouterLink>
        <RouterLink v-if="!$usersStore.isLoggedIn" to="/#demo">Demo</RouterLink>
        <RouterLink v-if="$usersStore.isLoggedIn" class="link link-bordered" to="/dashboard">
          Dashboard
        </RouterLink>
        <RouterLink v-if="!$usersStore.isLoggedIn" to="/signup" class="link link-bordered">
          Start for free
        </RouterLink>
        <RouterLink v-if="!$usersStore.isLoggedIn" to="/login">Login</RouterLink>
      </div>
      <IconBurgerMenu class="link navbar-menu" @click="$appStore.toggleMenu()" />
    </nav>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.navbar {
  height: 60px;
  border-bottom: 1px solid $primary-color;
  top: 0;
  z-index: 10;
  width: 100%;
  position: fixed;
  background: white;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    .navbar-title {
      font-size: 28px;
      margin: 0;
    }

    .navbar-menu {
      display: none;
      cursor: pointer;
      font-size: 30px;
    }

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
}

@media screen and (max-width: $desktop) {
  .navbar {
    nav {
      &.open {
        left: 0;
      }

      .navbar-items {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        background: white;
        top: 60px;
        width: 100%;
        left: 100%;
        height: 100vh;
        transition: all 0.25s ease;

        &.open {
          left: 0;
        }

        a {
          margin: 0;
          padding: 16px;
          text-align: center;
          font-size: 20px;

          &:not(.link-bordered) {
            width: 100%;
          }
        }
      }

      .navbar-menu {
        display: block;
      }
    }
  }
}

@media screen and (max-width: $phone) {
}
</style>
