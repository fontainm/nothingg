<script setup>
import SubmitButton from '@/components/SubmitButton.vue'
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
        <h3>{{ title }}</h3>
        <form :class="{ disabled: loading }">
          <slot></slot>
          <div class="modal-buttons">
            <button class="btn btn-small btn-danger" type="button" @click="closeModal">
              Cancel
            </button>
            <SubmitButton class="btn-small" text="Confirm" :loading="loading" />
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
    },
    title: {
      type: String,
      default: 'Edit'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    isVisible() {
      document.body.classList.toggle('modal-open')
    }
  },

  methods: {
    closeModal() {
      this.$emit('close')
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

@media screen and (max-width: $phone) {
  .modal-content {
    padding: 16px;
    margin: 0 16px;
  }
}
</style>
