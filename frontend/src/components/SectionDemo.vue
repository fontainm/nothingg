<script setup></script>

<template>
  <section class="demo" id="demo">
    <h2>Still not convinced?</h2>
    <p>Try out the demo and forge your opinion.</p>
    <RouterLink class="btn btn-negative" to="/dashboard" @click="handleClickDemo">
      Try Demo
    </RouterLink>
  </section>
</template>

<script>
export default {
  methods: {
    handleClickDemo() {
      this.$usersStore.setDemoUser()
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss';

.demo {
  background: $primary-gradient;
  color: $white;

  h2 {
    color: $white;
    -webkit-text-fill-color: $white;
  }

  p {
    font-size: 24px;
    margin-bottom: 32px;
    color: $white;
  }
}

@media screen and (max-width: $phone) {
  .demo {
    p {
      font-size: 18px;
    }
  }
}
</style>
