<template>
  <circle
    draggable
    @drag.self="onDrag"
    @mousedown.self="onStartDrag"
    r="5"
    :cx="x"
    :cy="y"
    style="z-index:101"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Plug",
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    originId: { type: Number },
    targetId: { type: Number },
    nodeIn: { type: Number }
  },
  watch: {},
  computed: {
    ...mapState({ config: state => state.flow.config })
  },

  methods: {
    ...mapActions({ setDragPayload: "flow/setDragPayload" }),
    onDrag(e) {
      e.preventDefault();
      document.onmousemove = this.onMove;
      document.onmouseup = this.onStopDrag;
    },
    onStartDrag(e) {
      e.preventDefault();
      document.onmousemove = this.onMove;
      document.onmouseup = this.onStopDrag;
    },
    onStopDrag(e) {
      this.setDragPayload({
        originId: null,
        targetId: null,
        position: { x: null, y: null },
        nodeIn: null
      });
      e.preventDefault();
      document.onmousemove = null;
      document.onmouseup = null;
    },

    onMove(e) {
      this.setDragPayload({
        originId: this.originId,
        targetId: this.targetId,
        position: { x: e.x, y: e.y + this.config.viewportOffset.y },
        nodeIn: this.nodeIn
      });
    }
  }
};
</script>

<style lang="scss" module>
circle {
  stroke: var(--v-accent-lighten3);
  fill: var(--v-accent-lighten3);
  fill-opacity: 1;
}
</style>
