<template>
  <main class="Game">
    <canvas id="game"></canvas>

    <section class="ControlBar">
      <div class="NutrientsView">
      </div>

      <minimap></minimap>
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
  }

  .ControlBar {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    height: 200px;

    .Minimap {
      width: 200px;
      padding: 20px;
      background: #3A3A3A;
      box-sizing: border-box;
    }
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
