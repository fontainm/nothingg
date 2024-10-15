<script setup>
import IconCheck from '~icons/mdi/check'
</script>

<template>
  <section class="products alternate" id="products">
    <div class="container">
      <h2>Our Products</h2>
      <div class="products-list">
        <div class="products-list__item">
          <div class="products-list__wrapper">
            <h3>Nothing FREE</h3>
            <p class="products-list__price">Free forever</p>
            <p class="products-list__info">
              Get access to the full Nothing experience. Sign up, log in, log out, and update your
              profile details. Enjoy the pure simplicity of doing absolutely nothing! No ads, no
              distractions—just you, your account, and a peaceful digital void.
            </p>
            <ul class="products-list__features">
              <li><IconCheck />Sign up and create your account.</li>
              <li><IconCheck />Log in, log out, and change your email or password.</li>
              <li><IconCheck />100% free, forever.</li>
            </ul>
            <button class="products-list__cta">Start Nothing FREE</button>
          </div>
        </div>

        <div class="products-list__item">
          <div class="products-list__wrapper">
            <h3>Nothing PLUS</h3>
            <p class="products-list__price">€ 1,- per month</p>
            <p class="products-list__info">
              Nothing PLUS doesn't do more, but it means more. By choosing Nothing PLUS, you're not
              just signing up—you're supporting a solo developer who built this project from
              scratch. Enjoy the same minimalism as the free tier, plus a warm sense of
              contribution.
            </p>
            <ul class="products-list__features">
              <li><IconCheck />All the same features as the free tier.</li>
              <li><IconCheck />A heartfelt thank you from the developer.</li>
              <li><IconCheck />The satisfaction of supporting a one-person project.</li>
            </ul>
            <button class="products-list__cta">Start Nothing PLUS</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.products {
  .products-list {
    display: flex;
    margin: 0 auto;

    .products-list__item {
      width: 50%;
      margin: 16px;

      .products-list__wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: white;
        border-radius: 10px;
        border: 1px solid $primary-color;
        padding: 32px;
      }

      .products-list__price {
        color: #aaa;
        margin: 16px;
        text-transform: uppercase;
      }

      .products-list__info {
        text-align: left;
        margin-bottom: 16px;
      }

      ul.products-list__features {
        list-style: none;
        text-align: left;
        margin-bottom: 16px;

        li {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          svg {
            color: $primary-color;
            margin-right: 8px;
          }
        }
      }

      .products-list__cta {
        margin-top: auto;
      }
    }
  }
}
</style>
