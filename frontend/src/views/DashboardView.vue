<script setup>
import IconCheckCircle from '~icons/mdi/check-circle'
import IconCloseCircle from '~icons/mdi/close-circle'
import ModalEditUsername from '@/components/ModalEditUsername.vue'
import ModalEditEmail from '@/components/ModalEditEmail.vue'
import ModalEditPassword from '@/components/ModalEditPassword.vue'
import ModalDeleteUser from '@/components/ModalDeleteUser.vue'
import ModalChangeSubscription from '@/components/ModalChangeSubscription.vue'
</script>

<template>
  <section v-if="user" class="dashboard" :class="{ 'dashboard-disabled': user.isDemoUser }">
    <h2>Welcome to {{ $appStore.appTitle }}!</h2>
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
          <div>Email verified</div>
          <div>
            <IconCheckCircle class="color-success" v-if="user.confirmed" />
            <IconCloseCircle class="color-danger" v-else />
          </div>
          <div
            v-if="!user.confirmed"
            class="link"
            :class="{ disabled: loading }"
            @click="handleResendEmail"
          >
            Resend
          </div>
        </div>
      </div>
      <div v-if="product" class="dashboard-info">
        <h3>Your Product</h3>
        <div class="dashboard-row">
          <div>{{ product.title }}</div>
          <div>
            {{ formatPrice(product.price_in_cents)
            }}<span v-if="product.id === 2" class="badge success-badge small-badge">PAID</span>
          </div>
          <div v-if="product.id === 1" class="link" @click="handleClickUpgrade">Upgrade</div>
        </div>
      </div>
      <div class="dashboard-buttons">
        <button class="btn btn-small btn-danger" @click="showDeleteUserModal = true">
          Delete account
        </button>
        <button v-if="user.isDemoUser" class="btn btn-small btn-demo" @click="handleLogout">
          Exit Demo
        </button>
        <button v-else class="btn btn-small" @click="handleLogout">Logout</button>
      </div>
    </div>
  </section>
  <ModalEditUsername :show="showEditUsernameModal" @close="showEditUsernameModal = false" />
  <ModalEditEmail :show="showEditEmailModal" @close="showEditEmailModal = false" />
  <ModalEditPassword :show="showEditPasswordModal" @close="showEditPasswordModal = false" />
  <ModalDeleteUser :show="showDeleteUserModal" @close="showDeleteUserModal = false" />
  <ModalChangeSubscription
    :show="showChangeSubscriptionModal"
    @close="showChangeSubscriptionModal = false"
  />
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showEditUsernameModal: false,
      showEditEmailModal: false,
      showEditPasswordModal: false,
      showDeleteUserModal: false,
      showChangeSubscriptionModal: false
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
    handleLogout() {
      this.$usersStore.logoutUser()
      this.$router.push('/')
    },

    async handleResendEmail() {
      this.loading = true
      try {
        await this.$usersStore.resendEmail({
          email: this.user.email
        })
      } catch (error) {
        this.loading = false
      }
      this.loading = false
    },

    handleClickUpgrade() {
      if (this.user.confirmed) {
        this.showChangeSubscriptionModal = true
        return
      }
      this.$appStore.showInfoMessage('error', 'Please verify your email first')
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    formatPrice(price) {
      return `€ ${price / 100}`
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
    color: $black;

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

  .dashboard-buttons {
    display: flex;
    justify-content: space-between;
  }

  &.dashboard-disabled {
    button:not(.btn-demo),
    .link {
      pointer-events: none;
    }

    .link {
      color: $light-gray;
    }

    button {
      background-color: $light-gray;
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
