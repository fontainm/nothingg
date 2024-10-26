<script setup>
import AppSignUp from '../components/AppSignUp.vue'
</script>

<template>
  <section class="signup">
    <h2>Sign Up for {{ $appStore.appTitle }}</h2>
    <AppSignUp />
  </section>
</template>
