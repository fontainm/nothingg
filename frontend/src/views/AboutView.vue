<template>
  <section class="about">
    <h2>About {{ $appStore.appTitle }}</h2>

    <div class="container">
      <p class="about-highlight">
        Welcome to <strong>{{ $appStore.appTitle }}</strong> - the SaaS platform that does
        absolutely nothing, by design.
      </p>

      <h3>What is {{ $appStore.appTitle }}?</h3>
      <p>
        It's simple. You sign up, log in, log out, change your password, and... that's it. No
        distractions. No complicated features. No endless notifications. Just a place where you can
        log in and then do <em>nothing</em>.
      </p>

      <h3>Why Did I Create {{ $appStore.appTitle }}?</h3>
      <p>
        The world is full of apps and platforms competing for your attention. I thought, why not
        make something that gives you a break from all that?
        <strong>{{ $appStore.appTitle }}</strong> exists to remind us that sometimes, less really is
        more. After all, in a time when everything demands your time and data, isn't it refreshing
        to do <em>nothing</em>?
      </p>

      <p class="about-highlight">
        Thank you for being part of <strong>{{ $appStore.appTitle }}</strong
        >. It means everything.
      </p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.about .container {
  text-align: left;

  h3 {
    margin: 32px 0 16px 0;
  }

  .about-highlight {
    text-align: center;
    margin-top: 32px;
    font-size: 24px;
  }
}
</style>
