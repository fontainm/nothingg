<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="'Edit Username'"
    :loading="loading"
    @submit="updateUsername"
    @close="closeModal"
  >
    <input v-model="username" placeholder="New username" />
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
      username: '',
      loading: false
    }
  },

  methods: {
    closeModal() {
      this.username = ''
      this.loading = false
      this.$emit('close')
    },

    async updateUsername(event) {
      event.preventDefault()
      this.loading = true

      try {
        await this.$usersStore.updateUsername(this.username)
        this.closeModal()
      } catch (error) {
        console.log(error)
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
