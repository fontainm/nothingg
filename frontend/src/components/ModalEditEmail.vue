<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="'Edit Email'"
    :loading="loading"
    @submit="updateEmail"
    @close="closeModal"
  >
    <input v-model="email" type="email" placeholder="New email address" required />
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
      email: '',
      loading: false
    }
  },

  methods: {
    closeModal() {
      this.email = ''
      this.loading = false
      this.$emit('close')
    },

    async updateEmail(event) {
      event.preventDefault()
      this.loading = true

      try {
        await this.$usersStore.updateEmail(this.email)
        this.$appStore.showInfoMessage('success', 'Email updated')
        this.closeModal()
      } catch (error) {
        this.$appStore.showInfoMessage('error', error.response.data.errors[0].msg)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';
</style>
