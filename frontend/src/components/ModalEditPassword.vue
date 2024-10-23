<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="'Edit Password'"
    :loading="loading"
    @submit="updatePassword"
    @close="closeModal"
  >
    <input v-model="oldPassword" type="password" placeholder="Current password" required />
    <input v-model="newPassword" type="password" placeholder="New password" required />
    <input
      v-model="newPasswordConfirm"
      type="password"
      placeholder="Confirm new password"
      required
    />
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
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      loading: false
    }
  },

  methods: {
    closeModal() {
      this.oldPassword = ''
      this.newPassword = ''
      this.newPasswordConfirm = ''
      this.loading = false
      this.$emit('close')
    },

    async updatePassword(event) {
      event.preventDefault()
      this.loading = true

      if (this.newPassword !== this.newPasswordConfirm) {
        this.$appStore.showInfoMessage('error', 'New passwords do not match')
        this.loading = false
        return
      }

      try {
        await this.$usersStore.updatePassword({
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
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
