<template>
  <splash v-if="phase === 'splash'"></splash>
  <wait v-else-if="phase === 'wait'"></wait>
  <game v-else-if="phase === 'game'"></game>
</template>
