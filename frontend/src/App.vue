<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import AppFooter from '@/components/AppFooter.vue'
import InfoMessage from '@/components/InfoMessage.vue'
</script>

<template>
  <AppNavbar />

  <div class="content">
    <RouterView />
  </div>

  <InfoMessage />

  <AppFooter />
</template>

<script>
export default {
  mounted() {
    this.$appStore.getProducts()
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

nav {
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  width: 100%;
  background: $white;
  top: 0;
  height: 60px;
  z-index: 10;
  border-bottom: 1px solid $primary-color;
}

.content {
  margin-top: 60px;
}
</style>
