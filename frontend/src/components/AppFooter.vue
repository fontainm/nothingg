<script setup>
import IconGithub from '~icons/mdi/github'
import IconEmail from '~icons/mdi/email-outline'
</script>

<template>
  <footer>
    <h2>{{ $appStore.appTitle }}</h2>
    <div class="footer-links">
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/privacy-policy">Privacy Policy</RouterLink>
      <RouterLink to="/terms-and-conditions">Terms & Conditions</RouterLink>
    </div>
    <div class="footer-socials">
      <a href="https://github.com/fontainm/nothing" target="_blank">
        <IconGithub />
      </a>
      <a :href="`mailto:${$appStore.appEmail}`">
        <IconEmail />
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

footer {
  background: $primary-gradient;
  color: $white;
  margin-top: auto;

  h2 {
    -webkit-text-fill-color: $white;
  }

  .footer-links {
    margin-bottom: 32px;

    a {
      padding: 0 8px;
      position: relative;
      color: $white;

      &:hover {
        color: $black;
      }

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
    a {
      color: $white;
    }

    svg {
      cursor: pointer;
      font-size: 30px;
      margin: 0 8px;
      transition: all 0.25s ease;

      &:hover {
        color: $black;
      }
    }
  }
}
</style>
