<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="'Change Subscription'"
    :loading="loading"
    :hide-buttons="true"
    @close="closeModal"
  >
    <p>I'm sorry. This feature is not available yet.</p>
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
