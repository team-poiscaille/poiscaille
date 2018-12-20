<template>
  <main class="Game">
    <section class="ControlBar">
      <minimap></minimap>
      <unit-skills></unit-skills>

      <div class="NutrientsView">

      </div>
    </section>

    <transition name="Dialog">
      <factory v-if="selectedUnit && selectedUnit.type === 'factory'"></factory>
    </transition>

    <transition name="Dialog">
      <dna-list v-if="dnaOpen"></dna-list>
    </transition>

    <transition name="Dialog">
      <unit-info v-if="selectedUnit"></unit-info>
    </transition>
  </main>
</template>

<style lang="less" scoped>
</style>

<script>
  import Minimap from "./Minimap";
  import UnitInfo from "./UnitInfo";
  import UnitSkills from "./UnitSkills";

  export default {
    components: {
      Minimap,
      UnitInfo,
      UnitSkills
    },

    data() {
      return {
        dnaOpen: false,
      };
    },

    computed: {
      selectedUnit() {
        return null;
      }
    }
  };
</script>
