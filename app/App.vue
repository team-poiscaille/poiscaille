<template>
  <transition name="Fadein" mode="out-in">
    <splash v-if="phase === 'splash'"></splash>
    <wait v-else-if="phase === 'wait'"></wait>
    <game v-else-if="phase === 'game'"></game>
  </transition>
</template>

<script>
  import Game from "./pages/Game.vue";
  import Splash from "./pages/Splash.vue";
  import Wait from "./pages/Wait.vue";

  export default {
    components: {
      Game,
      Splash,
      Wait
    },

    computed: {
      phase() {
        return this.$store.state.phase;
      }
    }
  };
</script>
