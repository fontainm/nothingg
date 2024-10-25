<script setup>
import IconCheckCircle from '~icons/mdi/check-circle'
import IconCloseCircle from '~icons/mdi/close-circle'
</script>

<template>
  <Transition>
    <div v-if="infoMessage !== null" class="info-message" :class="infoMessage.type">
      <IconCheckCircle v-if="infoMessage.type === 'success'" />
      <IconCloseCircle v-if="infoMessage.type === 'error'" />
      <p>
        {{ infoMessage.message }}
      </p>
    </div>
  </Transition>
</template>

<script>
export default {
  computed: {
    infoMessage() {
      return this.$appStore.infoMessage
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.info-message {
  position: fixed;
  z-index: 1000;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 10px;
  color: $white;
  line-height: 1;
  transition: all 0.25s ease;
  justify-content: space-between;
  min-width: 275px;

  svg {
    width: auto;
    margin-right: 8px;
  }

  p {
    color: $white;
    width: 90%;
  }

  &.success {
    background: $success-color;
  }

  &.error {
    background: $error-color;
  }
}

@media screen and (max-width: $desktop) {
  .info-message {
    top: unset;
    bottom: 80px;

    p {
      font-size: 18px;
    }
  }
}
</style>
