<script setup></script>

<template>
  <section class="faq" id="faq">
    <div class="container">
      <h2>Frequently Asked Question</h2>
      <div class="faq-container">
        <div class="faq-item">
          <input type="radio" name="accordion" id="faq1" />
          <label for="faq1" class="faq-question">What can I do on {{ $appStore.appTitle }}?</label>
          <div class="faq-answer">
            <p>
              On {{ $appStore.appTitle }} you can sign up, log in, log out, and update your email or
              password. That's it - embrace the simplicity!
            </p>
          </div>
        </div>

        <div class="faq-item">
          <input type="radio" name="accordion" id="faq2" />
          <label for="faq2" class="faq-question">Is {{ $appStore.appTitle }} really free?</label>
          <div class="faq-answer">
            <p>
              Yes, {{ $appStore.appTitle }} is completely free. There are no hidden fees or premium
              plans. Doing nothing costs nothing!
            </p>
          </div>
        </div>

        <div class="faq-item">
          <input type="radio" name="accordion" id="faq3" />
          <label for="faq3" class="faq-question">Can I delete my account?</label>
          <div class="faq-answer">
            <p>
              Yes, you can delete your account anytime. However, after deleting it, you'll have
              truly <em>nothing</em> - no access to your account or data.
            </p>
          </div>
        </div>

        <div class="faq-item">
          <input type="radio" name="accordion" id="faq4" />
          <label for="faq4" class="faq-question">What if I forget my password?</label>
          <div class="faq-answer">
            <p>
              If you forget your password, you can easily reset it by clicking the "Forgot Password"
              link on the login page.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.faq {
  .faq-container {
    max-width: 600px;
    text-align: left;
    margin: 0 auto;
  }

  .faq-item {
    border-bottom: 1px solid $primary-color;
    padding: 10px 0;
  }

  .faq-question {
    display: block;
    cursor: pointer;
    font-weight: 600;
    padding: 10px 0;
    color: $black;
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .faq-item input {
    display: none;
  }

  .faq-item input:checked ~ .faq-answer {
    max-height: 100px;
    transition: max-height 0.5s ease;
  }
}
</style>
