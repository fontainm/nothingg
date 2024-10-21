<template>
  <button class="btn btn-submit" type="submit">
    <div v-if="loading" class="spinner"></div>
    <span :class="{ hide: loading }">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.btn-submit {
  position: relative;

  .spinner {
    position: absolute;
    left: calc(50% - 12px);
    top: calc(50% - 12px);
  }

  span {
    &.hide {
      opacity: 0;
    }
  }
}
</style>
