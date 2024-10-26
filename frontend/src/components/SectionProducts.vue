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
            <h3>{{ $appStore.appTitle }}</h3>
            <p class="products-list__price">Free forever</p>
            <p class="products-list__info">
              Get access to the full {{ $appStore.appTitle }} experience. Sign up, log in, log out,
              and update your profile details. Enjoy the pure simplicity of doing absolutely
              nothing! No ads, no distractions - just you, your account, and a peaceful digital
              void.
            </p>
            <ul class="products-list__features">
              <li>
                <IconCheck />
                <p>Sign up and create your account.</p>
              </li>
              <li>
                <IconCheck />
                <p>Log in, log out, and change your email or password.</p>
              </li>
              <li>
                <IconCheck />
                <p>100% free, forever.</p>
              </li>
            </ul>
            <RouterLink to="/signup" class="products-list__cta btn">
              Start {{ $appStore.appTitle }}
            </RouterLink>
          </div>
        </div>

        <div class="products-list__item">
          <div class="products-list__wrapper">
            <h3>{{ $appStore.appTitle }}+</h3>
            <p class="products-list__price">€ 1,- per month</p>
            <p class="products-list__info">
              {{ $appStore.appTitle }}+ doesn't do more, but it means more. By choosing
              {{ $appStore.appTitle }}+, you're not just signing up - you're supporting a solo
              developer who built this project from scratch. Enjoy the same minimalism as the free
              tier, plus a warm sense of contribution.
            </p>
            <ul class="products-list__features">
              <li>
                <IconCheck />
                <p>All the same features as the free tier.</p>
              </li>
              <li>
                <IconCheck />
                <p>A heartfelt thank you from the developer.</p>
              </li>
              <li>
                <IconCheck />
                <p>The satisfaction of supporting a one-person project.</p>
              </li>
            </ul>
            <RouterLink to="/signup" class="products-list__cta btn">
              Start {{ $appStore.appTitle }}+
            </RouterLink>
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
    flex-wrap: wrap;
    margin: 0 auto;

    .products-list__item {
      width: 50%;

      h3 {
        font-size: 32px;
        font-weight: 900;
        text-transform: uppercase;
      }

      .products-list__wrapper {
        margin: 16px;
        display: flex;
        flex-direction: column;
        height: 100%;
        background: $white;
        border-radius: 10px;
        border: 1px solid $primary-color;
        padding: 32px;
      }

      .products-list__price {
        color: $light-gray;
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
          justify-content: space-between;
          margin-bottom: 8px;

          svg {
            color: $primary-color;
            margin-right: 8px;
            width: auto;
          }

          p {
            width: 90%;
          }
        }
      }

      .products-list__cta {
        margin-top: auto;
      }
    }
  }
}

@media screen and (max-width: $tablet) {
  .products {
    .products-list {
      .products-list__item {
        width: 100%;
        margin: 0 0 16px 0;

        .products-list__wrapper {
          margin: 16px 0;
        }
      }
    }
  }
}
</style>
