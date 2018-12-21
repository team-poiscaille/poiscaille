<template>
  <main id="Splash">
    <section class="Project">
      <img class="Project__logo" src="../images/Logo.svg">
      <h1 class="Project__title">
        Project <span class="Bold">Poiscaille</span>
      </h1>
    </section>
  </main>
</template>

<style lang="less" scoped>
  #Splash {
    background: #3a3a3a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .Project {
    &__logo {
      width: 20vw;
      max-width: 30vh;
    }

    &__title {
      font-size: 3vw;
      font-weight: 100;
      margin: 0;
      padding: 0;
      margin-left: 100px;
    }
  }

  .Bold {
    font-weight: 700;
  }
</style>

<script>
  export default {};
</script>
