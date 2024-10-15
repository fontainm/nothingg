<script setup>
import IconGithub from '~icons/mdi/github'
import IconInstagram from '~icons/mdi/instagram'
import IconEmail from '~icons/mdi/email-outline'
</script>

<template>
  <footer>
    <h2>Nothing</h2>
    <div class="footer-links">
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
      <RouterLink to="/terms-and-conditions">Terms & Conditions</RouterLink>
    </div>
    <div class="footer-socials">
      <IconGithub />
      <IconInstagram />
      <IconEmail />
    </div>
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

  .footer-links {
    margin-bottom: 32px;

    a {
      padding: 0 8px;
      position: relative;

      &:not(:last-child)::after {
        content: '';
        height: 100%;
        border-right: 1px solid $primary-light;
        position: absolute;
        right: 0;
      }
    }
  }

  .footer-socials {
    svg {
      font-size: 30px;
      margin: 0 8px;
    }
  }
}
</style>
