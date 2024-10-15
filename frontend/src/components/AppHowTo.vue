<script setup>
import IconLogin from '~icons/mdi/login'
import IconRegister from '~icons/mdi/account-plus'
import IconEmoticon from '~icons/mdi/emoticon-excited-outline'
</script>

<template>
  <section class="howto" id="howto">
    <div class="container">
      <h2>How it works</h2>
      <div>
        <div class="howto-steps">
          <div class="howto-step">
            <p class="howto-step__title">Step 1</p>
            <div class="howto-step__icon">
              <IconRegister />
            </div>
            <h3>Sign Up</h3>
            <p>Create your account effortlessly</p>
          </div>
          <div class="howto-step">
            <p class="howto-step__title">Step 2</p>
            <div class="howto-step__icon">
              <IconLogin />
            </div>
            <h3>Log In</h3>
            <p>Access your personal space.</p>
          </div>
          <div class="howto-step">
            <p class="howto-step__title">Step 3</p>
            <div class="howto-step__icon">
              <IconEmoticon />
            </div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
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

    .howto-step__icon {
      margin-bottom: 16px;

      svg {
        color: $primary-color;
        height: 40px;
        width: 40px;
        font-size: 40px;
      }
    }
  }
}
</style>
