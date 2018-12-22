<template>
  <div class="DNASlot" :class="{'DNASlot--expandable': expandable}">
    <div class="DNASlot__header" @click="toggleExpansion">
      <span class="DNASlot__title">
        <i class="DNASlot__icon mdi" :class="dna.icon"></i>
        {{dna.title}}
      </span>

      <span class="DNASlot__nutrients">
        {{dna.nutrients}}
      </span>
    </div>

    <transition name="Expand">
      <div class="DNASlot__expanded" v-if="expanded">
        <div class="DNASlot__section">
          <div class="DNASlot__section__title">
            <i class="mdi mdi-chart-bubble"></i>
            영양소
          </div>
          <div class="DNASlot__section__body  DNASlot__section__body--large">
            {{dna.nutrients}} / {{nutrients}}
          </div>
        </div>

        <div class="DNASlot__section">
          <div class="DNASlot__section__title">
            <i class="mdi mdi-comment-text-outline"></i>
            설명
          </div>
          <div class="DNASlot__section__body">
            {{dna.description}}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped>
  * {
    user-select: none;
  }

  .DNASlot {
    &--expandable {
      .DNASlot__header {
        cursor: pointer;
      }
    }

    &__header {
      background: #d4d4d4;
      color: #4f4f4f;
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      font-size: 1.5rem;
      display: flex;
      justify-content: space-between;
      padding: 20px 10%;
    }

    &__expanded {
      background: #282828;
    }

    &__section {
      padding: 30px 10%;
      color: #cfcccc;
      font-family: 'NanumBarunGothic', sans-serif;

      &__title {
        font-size: 1.3rem;
        font-weight: 700;
        padding-bottom: 15px;
      }

      &__body {
        font-size: 1.1rem;
        margin-left: 25px;
        line-height: 1.5rem;

        &--large {
          font-weight: 100;
          font-size: 1.5rem;
        }
      }
    }
  }
</style>

<script>
  export default {
    model: {
      prop: 'expanded',
      event: 'expand'
    },

    props: {
      expandable: Boolean,
      expanded: Boolean,
      dna: {
        required: true,
        type: Object
      }
    },

    computed: {
      nutrients() {
        return this.$store.state.nutrients;
      },
    },

    methods: {
      toggleExpansion() {
        if(!this.expandable) return;

        this.$emit('expand', !this.expanded);
      }
    }
  };
</script>
