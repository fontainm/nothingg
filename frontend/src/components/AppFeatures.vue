<script setup></script>

<template>
  <section class="features" id="features">
    <div class="container">
      <h2>Features</h2>
      <div class="features-list">
        <div class="features-item">
          <h3>Easy Sign-Up</h3>
          <p>No complicated forms, just your email and a password.</p>
        </div>
        <div class="features-item">
          <h3>Secure Log In</h3>
          <p>“Your information is safe and secure, allowing you to do nothing worry-free.</p>
        </div>
        <div class="features-item">
          <h3>Privacy Focused</h3>
          <p>“We don't track your activity. Just log in and disconnect.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.features {
  text-align: center;

  .features-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .features-item {
    background-color: $primary-color;
    width: 50%;
    color: white;
    padding: 16px 32px;
    margin: 16px;
    border-radius: 10px;
    text-align: left;

    h3 {
      text-transform: uppercase;
      letter-spacing: 3px;
    }

    &:first-child {
      transform: translateX(-50px);
    }

    &:last-child {
      transform: translateX(50px);
    }
  }
}
</style>
