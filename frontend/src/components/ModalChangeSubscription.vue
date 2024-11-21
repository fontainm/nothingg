<script setup>
import AppEditModal from '@/components/AppEditModal.vue'
</script>

<template>
  <AppEditModal
    :isVisible="show"
    :title="`Upgrade to ${$appStore.appTitle} PRO`"
    confirmText="Checkout"
    :loading="loading"
    @submit="checkoutProduct"
    @close="closeModal"
  >
    <p>Support the project and upgrade to {{ $appStore.appTitle }} PRO!</p>
    <div class="upgrade-overview">
      <div class="upgrade-product">
        {{ $appStore.appTitle }}<span class="badge primary-badge small-badge">PRO</span>
      </div>
      <div>5€ <span class="small">(one-time payment)</span></div>
    </div>
    <p>Your payment will be securely processed by Stripe.</p>
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

div.upgrade-overview {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid $primary-color;
  border-radius: 10px;

  .upgrade-product {
    font-weight: 900;
    text-transform: uppercase;
  }

  .small {
    font-size: 12px;
  }
}

p {
  margin-bottom: 16px;
}
</style>
