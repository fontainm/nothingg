<template>
  <section class="intro" id="home">
    <div class="container">
      <h1>Nothing</h1>
      <p>
        A place where simplicity meets tranquility. Sign up, log in, and enjoy the freedom of doing
        nothing
      </p>
      <button class="negative">Get started for free</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.intro {
  text-align: center;
  background-color: $primary-color;
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
    text-shadow: -5px 5px 0 black;
    transition: all 0.25s ease;
    cursor: pointer;
  }

  p {
    font-size: 24px;
    margin-bottom: 24px;
  }
}
</style>
