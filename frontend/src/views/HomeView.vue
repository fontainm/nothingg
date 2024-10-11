<script setup>
import AppIntro from '../components/AppIntro.vue'
import AppHowTo from '../components/AppHowTo.vue'
import AppFeatures from '../components/AppFeatures.vue'
import AppBenefits from '../components/AppBenefits.vue'
import AppProducts from '../components/AppProducts.vue'
import AppFAQ from '../components/AppFAQ.vue'
import AppUsers from '../components/AppUsers.vue'
import AppMap from '../components/AppMap.vue'
</script>

<template>
  <main>
    <AppIntro />
    <AppHowTo />
    <AppBenefits />
    <AppFeatures />
    <AppProducts />
    <AppFAQ />
    <AppUsers />
    <AppMap />
    <section class="cta">
      <h2>Ready to Embrace Nothing?</h2>
      <p>Sign up, log in, and enjoy the freedom of doing nothing!</p>
      <button>Sign Up Today</button>
    </section>
  </main>
</template>

<style scoped lang="scss"></style>
