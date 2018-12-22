<template>
  <main id="Splash">
    <section class="Project">
      <svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" class="Project__logo">
      	<g class="Filled">
      		<path d="M184 594V266L348 430L512 266L676 430L512 594L348 430L184 594Z" fill="url(#paint0_linear)"/>
      		<path d="M348 758V430L512 594L676 430L840 594L676 758L512 594L348 758Z" fill="url(#paint1_linear)"/>
      	</g>

      	<path class="StrokeAnim"
      		d="M348,430 L348,758 L676,430 L840,594 L676,758 L184,266 V594 L512,266 L676,430 L512,594 L348,430"
      		stroke="url(#paint0_linear)"/>

      	<defs>
      		<linearGradient id="paint0_linear" x1="430" y1="113" x2="430" y2="594" gradientUnits="userSpaceOnUse">
      			<stop stop-color="#03C58B"/>
      			<stop offset="1" stop-color="#53B5ED"/>
      		</linearGradient>
      		<linearGradient id="paint1_linear" x1="594" y1="183" x2="594" y2="758" gradientUnits="userSpaceOnUse">
      			<stop stop-color="#5391E4"/>
      			<stop offset="1" stop-color="#2FBFED"/>
      		</linearGradient>
      	</defs>
      </svg>

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
      height: 20vw;
      max-height: 30vh;
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

  .StrokeAnim {
    stroke-dasharray: 3500;
    stroke-width: 2px;
    animation: draw 5s ease forwards;
  }

  .Filled {
    opacity: 0;
    animation: Fadein 1s ease forwards 5s;
  }

  @keyframes draw {
    from {
      stroke-dashoffset: 3500;
    }

    to {
      stroke-dashoffset: 0;
    }
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
