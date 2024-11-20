<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="'Change Subscription'"
    :loading="loading"
    @submit="checkoutProduct"
    @close="closeModal"
  >
    <p>Thank you for upgrading!</p>
  </AppEditModal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      password: ''
    }
  },

  methods: {
    async checkoutProduct(event) {
      event.preventDefault()
      this.loading = true

      try {
        await this.$usersStore.upgradeUser()
      } catch (error) {
        this.loading = false
      }
    },

    closeModal() {
      this.loading = false
      this.$emit('close')
    },

    async deleteUser(event) {
      event.preventDefault()
      this.loading = true

      try {
        await this.$usersStore.deleteUser(this.password)
        this.$usersStore.logoutUser()
        this.$router.push('/')
        this.$emit('close')
      } catch (error) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
</style>
