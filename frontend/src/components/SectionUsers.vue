<script setup>
import IconCommentQuote from '~icons/mdi/comment-quote'
</script>

<template>
  <section class="users alternate">
    <div class="container">
      <h2>Our Users</h2>
      <div class="users-total">
        So far
        <span>
          {{ totalUsers }}
        </span>
        users signed up
      </div>
      <div class="users-quotes">
        <div class="users-quote">
          <div class="users-quote__icon">
            <IconCommentQuote />
          </div>
          <p>"{{ $appStore.appTitle }} is the perfect escape from my busy life!"</p>
        </div>
        <div class="users-quote">
          <div class="users-quote__icon">
            <IconCommentQuote />
          </div>
          <p>"I never knew doing nothing could be so refreshing."</p>
        </div>
        <div class="users-quote">
          <div class="users-quote__icon">
            <IconCommentQuote />
          </div>
          <p>"I feel indifferent about it."</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    totalUsers() {
      return this.$usersStore.totalUsers
    }
  },

  mounted() {
    if (!this.totalUsers) {
      this.countUsers()
    }
  },

  methods: {
    async countUsers() {
      this.$usersStore.getTotalUsers()
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.users {
  .users-total {
    color: $black;
    font-size: 32px;
    margin-bottom: 32px;

    span {
      background: $primary-gradient;
      color: $white;
      padding: 8px;
      border-radius: 10px;
      width: 100px;
      display: inline-block;
      font-weight: 700;
    }
  }

  .users-quotes {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;

    .users-quote {
      display: flex;
      align-items: center;
      background-color: $white;
      padding: 16px;
      margin: 16px;
      border-radius: 10px;
      text-align: left;

      .users-quote__icon {
        margin-right: 16px;

        svg {
          font-size: 30px;
          height: 30px;
          width: 30px;
          color: $primary-color;
        }
      }

      &:nth-child(2) {
        flex-direction: row-reverse;
        text-align: right;

        .users-quote__icon {
          margin-left: 16px;
        }
      }
    }
  }
}

@media screen and (max-width: $tablet) {
  .users {
    .users-total {
      font-size: 24px;
    }
  }
}
</style>
