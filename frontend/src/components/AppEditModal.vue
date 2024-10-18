<script setup>
import IconAccountEdit from '~icons/mdi/account-edit'
import IconClose from '~icons/mdi/close'
</script>

<template>
  <Transition name="modal-fade">
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-close link" @click="closeModal">
          <IconClose />
        </div>
        <div class="modal-icon">
          <IconAccountEdit />
        </div>
        <h3>Edit Username</h3>
        <form @submit="handleSubmit" :class="{ disabled: loading }">
          <p>{{ errorMessage }}</p>
          <input v-model="username" placeholder="New username" />
          <div class="modal-buttons">
            <button class="btn btn-small btn-danger" @click="closeModal">Cancel</button>
            <button class="btn btn-small" type="submit">
              <span v-if="loading">...</span><span v-else>Confirm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      loading: false,
      username: '',
      errorMessage: ''
    }
  },

  methods: {
    closeModal() {
      this.username = ''
      this.errorMessage = ''
      this.loading = false
      this.$emit('close')
    },

    async handleSubmit(event) {
      event.preventDefault()
      this.loading = true
      this.errorMessage = ''

      try {
        await this.$usersStore.updateUsername(this.username)
        this.closeModal()
      } catch (error) {
        this.errorMessage = error.response.data.errors[0].msg
        setTimeout(() => {
          this.errorMessage = ''
        }, 3000)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.modal-overlay {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 32px;
  border-radius: 10px;
  position: relative;
  width: 400px;
  max-width: 100%;
  text-align: center;

  h3 {
    margin-bottom: 16px;
  }

  .modal-icon {
    font-size: 30px;
    color: $primary-color;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }
}
</style>
