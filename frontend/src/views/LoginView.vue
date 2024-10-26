<script setup>
import AppLogin from '../components/AppLogin.vue'
</script>

<template>
  <section class="login">
    <h2>Login for {{ $appStore.appTitle }}</h2>
    <AppLogin />
  </section>
</template>
