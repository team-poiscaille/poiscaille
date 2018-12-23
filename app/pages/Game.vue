<template>
  <main class="Game">
    <canvas id="game"></canvas>

    <section class="ControlBar">
      <minimap></minimap>
      <div class="NutrientsView">

      </div>
    </section>

    <transition name="Dialog">
      <factory v-if="selectedUnits && selectedUnits.getType() === 'factory'"></factory>
    </transition>

    <transition name="Dialog">
      <dna-list v-if="dnaOpen"></dna-list>
    </transition>

    <transition name="Dialog">
      <unit-info v-if="selectedUnits"></unit-info>
    </transition>
  </main>
</template>

<style lang="less" scoped>
  .Game {
    width: 100vw;
    height: 100vh;

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .ControlBar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 200px;
  }
</style>

<script>
  import Minimap from "../layout/Minimap.vue";
  import UnitInfo from "../layout/UnitInfo.vue";

  export default {
    components: {
      Minimap,
      UnitInfo
    },

    data() {
      return {
        dnaOpen: false,
      };
    },

    computed: {
      selectedUnits() {
        return this.$store.state.selectedUnits;
      }
    },

    mounted() {
      this.$game.initGame();
    }
  };
</script>
