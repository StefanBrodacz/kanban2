<template>
  <circle
    draggable
    @mousedown="onStartDrag"
    r="4"
    :cx="x"
    :cy="y"
    style="z-index:101"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Plug",
  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    originId: { type: Number },
    targetId: { type: Number },
    nodeIn: { type: Number }
  },
  methods: {
    ...mapActions({ setTargetLinkPosition: "flow/setTargetLinkPosition" }),
    onDrag(e) {
      e.preventDefault();
      document.onmousemove = this.onMove;
      document.onmouseup = this.onStopDrag;
    },
    onStartDrag() {
      document.onmousemove = this.onMove;
      document.onmouseup = this.onStopDrag;
    },
    onStopDrag() {
      document.onmousemove = null;
      document.onmouseup = null;
    },

    onMove(e) {
      this.setTargetLinkPosition({
        originId: this.originId,
        targetId: this.targetId,
        position: { x: e.offsetX, y: e.offsetY },
        nodeIn: this.nodeIn
      });
    }
  }
};
</script>

<style lang="scss" module></style>
