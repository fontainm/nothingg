<script setup></script>

<template>
  <footer>
    <h2>Nothing</h2>
    <div>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
      <RouterLink to="/terms-and-conditions">Terms & Conditions</RouterLink>
      <RouterLink to="/">Contact</RouterLink>
    </div>
    <div>Socials</div>
  </footer>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

footer {
  background: $primary-gradient;

  h2 {
    color: white;
    -webkit-text-fill-color: white;
  }
}
</style>
