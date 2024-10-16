<template>
  <section class="intro" id="home">
    <div class="container">
      <h1>Nothing</h1>
      <p class="intro-subheader">A place where simplicity meets tranquility</p>
      <RouterLink to="/signup" class="btn btn-negative">Get started for free</RouterLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.intro {
  background: $primary-gradient;
  color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 256px;
    line-height: 1;
    font-weight: 900;
    text-transform: uppercase;
    text-shadow: 0 10px 0 black;
    transition: all 0.25s ease;
    cursor: pointer;

    &:hover {
      text-shadow: 0 0 0 black;
      transform: translateY(5px);
    }
  }

  .intro-subheader {
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin: 64px 0;
  }

  @media screen and (max-width: $desktop) {
    h1 {
      font-size: 180px;
    }
  }

  @media screen and (max-width: $tablet) {
    h1 {
      font-size: 100px;
    }

    .intro-subheader {
      font-size: 18px;
    }
  }

  @media screen and (max-width: $phone) {
    h1 {
      font-size: 64px;
    }
  }
}
</style>
