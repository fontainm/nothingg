<script setup>
import IconEmoticon from '~icons/mdi/emoticon-excited-outline'
</script>

<template>
  <section class="success">
    <h2>Payment was successful!</h2>
    <p>Thank you so much for supporting my project!</p>
    <IconEmoticon class="success-icon" />
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.success-icon {
  font-size: 256px;
  color: $primary-color;
  margin-top: 16px;
}
</style>
