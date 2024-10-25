<script setup>
import SectionIntro from '../components/SectionIntro.vue'
import SectionHowTo from '../components/SectionHowTo.vue'
import SectionFeatures from '../components/SectionFeatures.vue'
import SectionBenefits from '../components/SectionBenefits.vue'
import SectionProducts from '../components/SectionProducts.vue'
import SectionFAQ from '../components/SectionFAQ.vue'
import SectionUsers from '../components/SectionUsers.vue'
import SectionDemo from '../components/SectionDemo.vue'
import SectionCTA from '../components/SectionCTA.vue'
</script>

<template>
  <main>
    <SectionIntro />
    <SectionHowTo />
    <SectionBenefits />
    <SectionFeatures />
    <SectionProducts />
    <SectionFAQ />
    <SectionUsers />
    <SectionDemo v-if="!$usersStore.isLoggedIn" />
    <SectionCTA />
  </main>
</template>
