<script setup></script>

<template>
  <section class="howto" id="howto">
    <div class="container">
      <h2>How it works</h2>
      <div>
        <div class="howto-steps">
          <div class="howto-step">
            <p class="howto-step__title">Step 1</p>
            <h3>Sign Up</h3>
            <p>Create your account effortlessly</p>
          </div>
          <div class="howto-step">
            <p class="howto-step__title">Step 2</p>
            <h3>Log In</h3>
            <p>Access your personal space.</p>
          </div>
          <div class="howto-step">
            <p class="howto-step__title">Step 3</p>
            <h3>Enjoy Nothing</h3>
            <p>Experience the tranquility of doing absolutely nothing.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.howto {
  text-align: center;

  .howto-steps {
    display: flex;
    justify-content: center;
  }

  .howto-step {
    width: 20%;
    border: 1px solid $primary-color;
    border-radius: 10px;
    padding: 16px;
    margin: 0 16px;
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      transform: translateY(-10px);
      background: $primary-light;
    }

    h3 {
      margin-bottom: 16px;
    }

    .howto-step__title {
      font-size: 20px;
      color: $primary-color;
      text-transform: uppercase;
      letter-spacing: 3px;
      margin-bottom: 16px;
    }
  }
}
</style>
