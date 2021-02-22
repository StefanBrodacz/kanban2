<template>
  <circle r="4" :cx="x" :cy="y" style="z-index:101" />
</template>

<script>
export default {
  name: "Plug",
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  }
};
</script>

<style lang="scss" module>
circle {
  stroke: var(--v-accent-base);
  fill: var(--v-accent-base);
  fill-opacity: 1;
}
</style>
