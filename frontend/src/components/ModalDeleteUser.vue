<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="'Delete User'"
    :loading="loading"
    @submit="deleteUser"
    @close="closeModal"
  >
    <p>Are you sure you want to permanently delete your user?</p>
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
      loading: false
    }
  },

  methods: {
    closeModal() {
      this.loading = false
      this.$emit('close')
    },

    async deleteUser(event) {
      console.log('DELETE!')
      event.preventDefault()
      this.loading = true

      try {
        await this.$usersStore.deleteUser()
        this.closeModal()
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
