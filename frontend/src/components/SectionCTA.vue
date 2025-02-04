<script setup></script>

<template>
  <section class="cta">
    <h2>Ready to Embrace {{ $appStore.appTitle }}?</h2>
    <p>Sign up, log in, and enjoy the freedom of doing nothing!</p>
    <RouterLink to="/signup" class="products-list__cta btn">Sign Up Today</RouterLink>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables.scss';

.cta {
  p {
    font-size: 24px;
    margin-bottom: 32px;
  }
}

@media screen and (max-width: $phone) {
  .cta {
    p {
      font-size: 18px;
    }
  }
}
</style>
