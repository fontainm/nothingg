<script setup></script>

<template>
  <footer>
    <h2>Nothing</h2>
    <div>
      <RouterLink to="/">About</RouterLink>
      <RouterLink to="/">Privacy Policy</RouterLink>
      <RouterLink to="/">Terms & Conditions</RouterLink>
      <RouterLink to="/">Contact</RouterLink>
    </div>
    <div>Socials</div>
  </footer>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

footer {
  background: $primary-color;

  h2 {
    color: white;
  }
}
</style>
