<script setup>
import IconCheckCircleOutline from '~icons/mdi/check-circle-outline'
</script>

<template>
  <section class="features" id="features">
    <div class="container">
      <h2>Features</h2>
      <div class="features-list">
        <div class="features-item">
          <div class="features-item__icon"><IconCheckCircleOutline /></div>
          <div>
            <h3>Easy Sign-Up</h3>
            <p>No complicated forms, just your email and a password.</p>
          </div>
        </div>
        <div class="features-item">
          <div class="features-item__icon"><IconCheckCircleOutline /></div>
          <div>
            <h3>Secure Log In</h3>
            <p>Your information is safe and secure, allowing you to do nothing worry-free.</p>
          </div>
        </div>
        <div class="features-item">
          <div class="features-item__icon"><IconCheckCircleOutline /></div>
          <div>
            <h3>Privacy Focused</h3>
            <p>We don't track your activity. Just log in and disconnect.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.features {
  .features-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .features-item {
    display: flex;
    background: $primary-gradient;
    width: 50%;
    color: $white;
    padding: 32px;
    margin: 16px;
    border-radius: 10px;
    text-align: left;
    align-items: center;
    cursor: pointer;
    transition: all 0.25s ease;
    transform-origin: center;

    .features-item__icon {
      width: 30px;
      height: 30px;
      margin-right: 32px;

      svg {
        font-size: 30px;
      }
    }

    h3 {
      text-transform: uppercase;
      letter-spacing: 3px;
      color: $white;
    }

    p {
      color: $white;
    }

    &:first-child {
      margin-left: -50px;
    }

    &:last-child {
      margin-right: -50px;
    }

    &:hover {
      transform: scale(1.05);
    }
  }
}

@media screen and (max-width: $tablet) {
  .features {
    .features-item {
      width: 100%;
      transform: unset !important;
    }
  }
}

@media screen and (max-width: $phone) {
}
</style>
