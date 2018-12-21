<template>
  <main id="Splash">
    <section class="Project">
      <img class="Project__logo" src="../images/LogoAnimation.svg">
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

    width: 100vw;
    height: 100vh;
  }

  .Project {
    display: flex;
    align-items: center;

    &__logo {
      width: 20vw;
      max-width: 30vh;
    }

    &__title {
      color: #fff;
      font-family: 'Noto Sans CJK KR', sans-serif;
      font-size: 5vw;
      font-weight: 100;
      margin: 0;
      padding: 0;

      opacity: 0;
      animation: Fadein 1s ease forwards 5.3s;
    }
  }

  .Bold {
    font-weight: 700;
  }
</style>

<script>
  export default {
    mounted() {
      if((process.env.NODE_ENV || 'development') === 'development') {
        this.$store.commit('phase', 'wait');
        return;
      }

      setTimeout(() => this.$store.commit('phase', 'wait'), 7000);
    }
  };
</script>
