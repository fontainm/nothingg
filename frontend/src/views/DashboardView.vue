<script setup>
import IconCheckCircle from '~icons/mdi/check-circle'
import IconCloseCircle from '~icons/mdi/close-circle'
import ModalEditUsername from '@/components/ModalEditUsername.vue'
import ModalEditEmail from '@/components/ModalEditEmail.vue'
import ModalEditPassword from '@/components/ModalEditPassword.vue'
</script>

<template>
  <section v-if="user" class="dashboard">
    <h2>Welcome to nothing!</h2>
    <div class="dashboard-wrapper">
      <div class="dashboard-info">
        <h3>Personal info</h3>
        <div class="dashboard-row">
          <div>ID</div>
          <div>{{ user.id }}</div>
        </div>
        <div class="dashboard-row">
          <div>Username</div>
          <div>{{ user.username }}</div>
          <div class="link" @click="showEditUsernameModal = true">Edit</div>
        </div>
        <div class="dashboard-row">
          <div>Email</div>
          <div>{{ user.email }}</div>
          <div class="link" @click="showEditEmailModal = true">Edit</div>
        </div>
        <div class="dashboard-row">
          <div>Password</div>
          <div>●●●●●●●●</div>
          <div class="link" @click="showEditPasswordModal = true">Edit</div>
        </div>
        <div class="dashboard-row">
          <div>Member since</div>
          <div>{{ formatDate(user.created_at) }}</div>
        </div>
        <div class="dashboard-row">
          <div>Email confirmed</div>
          <div>
            <IconCheckCircle class="color-success" v-if="user.confirmed" />
            <IconCloseCircle class="color-danger" v-else />
          </div>
          <div v-if="!user.confirmed" class="link">Resend</div>
        </div>
      </div>
      <div v-if="product" class="dashboard-info">
        <h3>Your Product</h3>
        <div class="dashboard-row">
          <div>{{ product.title }}</div>
          <div>{{ formatPrice(product.price) }} / month</div>
          <div class="link">Upgrade</div>
        </div>
      </div>
      <button class="btn btn-small">Delete account</button>
    </div>
  </section>
  <ModalEditUsername :show="showEditUsernameModal" @close="showEditUsernameModal = false" />
  <ModalEditEmail :show="showEditEmailModal" @close="showEditEmailModal = false" />
  <ModalEditPassword :show="showEditPasswordModal" @close="showEditPasswordModal = false" />
</template>

<script>
export default {
  data() {
    return {
      showEditUsernameModal: false,
      showEditEmailModal: false,
      showEditPasswordModal: false
    }
  },

  computed: {
    user() {
      return this.$usersStore.user
    },

    product() {
      return this.$appStore.products.find((p) => p.id === this.user.product_id)
    }
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    formatPrice(price) {
      return `€ ${price}`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.dashboard {
  .dashboard-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }

  .dashboard-info {
    text-align: left;
    border: 1px solid $primary-color;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 16px;
    margin-bottom: 16px;

    h3 {
      color: $primary-color;
    }

    .dashboard-row {
      display: grid;
      grid-template-columns: 25% 50% 25%;
      grid-template-rows: auto;

      &:not(:last-child) {
        border-bottom: 1px solid $primary-light;
      }

      > div {
        margin: 8px 0;

        &:first-child {
          font-weight: 700;
        }

        &:nth-child(3) {
          text-align: center;
        }
      }
    }
  }
}

@media screen and (max-width: $tablet) {
  .dashboard {
    .dashboard-info {
      grid-template-columns: 100%;

      .dashboard-row {
        grid-template-columns: 75% 25%;

        > div {
          &:first-child {
            margin-bottom: 0;
            grid-column: 1 / -1;
          }
        }
      }
    }
  }
}
</style>
