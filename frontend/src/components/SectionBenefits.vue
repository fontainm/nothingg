<script setup></script>

<template>
  <section class="benefits alternate" id="benefits">
    <div class="container">
      <p>Unplug and Unwind: Take a break from the digital noise.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables.scss';

.benefits {
  p {
    margin: 16px;
    font-size: 48px;
    font-weight: 100;
    font-style: italic;
    color: $primary-color;
  }
}

@media screen and (max-width: $tablet) {
  .benefits {
    p {
      font-size: 38px;
    }
  }
}

@media screen and (max-width: $phone) {
  .benefits {
    p {
      font-size: 32px;
    }
  }
}
</style>
