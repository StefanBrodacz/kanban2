<template>
  <div
    @mouseup="dropped"
    @mousedown.prevent="onPlugDown"
    class="inputSlot circle"
    :class="{ active: isActive, bottom: isBottom }"
    :style="{ top: `${topPosition}px`, left: `${horizontalPosition}px` }"
    ref="socket"
  ></div
></template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SocketIn",
  props: {
    status: {
      type: Object
    },
    linkNo: { type: Number },
    linkId: { type: Number },
    topPosition: { type: Number }
  },
  computed: {
    ...mapState({
      flow: state => state.flow.statusFlow,
      dragPayload: state => state.flow.dragPayload,
      flowConfig: state => state.flow.config
    }),
    horizontalPosition() {
      return this.flowConfig.sockets.gap * this.linkId;
    },
    link() {
      let targets = this.findStatusesByTarget(this.status.id);
      return targets.find(status => {
        return status.link.find(link => {
          return (
            link.node.in === this.linkNo && link.targetId === this.status.id
          );
        });
      });
    },
    isActive() {
      return typeof this.link !== "undefined";
    },
    isBottom() {
      return this.linkNo > 5;
    }
  },
  methods: {
    ...mapActions({
      findStatusByTarget: "flow/findStatusByTarget",
      plugin: "flow/plugin",
      setDragPayload: "flow/setDragPayload"
    }),
    onPlugDown(e) {
      e.preventDefault();
      document.onmousemove = this.onPlugMove;
      document.onmouseup = this.plugStopDrag;
      if (this.isActive) {
        this.setDragPayload({
          originId: this.link.id,
          targetId: this.status.id,
          position: { x: e.x, y: e.y },
          nodeIn: this.linkNo
        });
      }
    },
    onPlugMove(e) {
      if (this.isActive)
        this.setDragPayload({
          originId: this.link.id,
          targetId: this.status.id,
          position: { x: e.x, y: e.y },
          nodeIn: this.linkNo
        });
    },
    plugStopDrag() {
      if (this.isActive)
        this.setDragPayload({
          originId: null,
          targetId: null,
          position: { x: 0, y: 0 },
          nodeIn: null,
          restoring: true
        });
      document.onmousemove = null;
      document.onmouseup = null;
    },
    dropped() {
      if (this.dragPayload.originId !== null)
        this.plugin({
          originId: this.dragPayload.originId,
          oldTargetId: this.dragPayload.targetId,
          newTargetId: this.status.id,
          newNodeIn: this.linkNo
        });
    },
    findStatusesByTarget(targetId) {
      return this.flow.statuses.filter(status => {
        return status.link.find(link => {
          return link.targetId === targetId;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.inputSlot {
  position: absolute;
}
.circle {
  &.active {
    opacity: 1;
    background-color: var(--v-accent-base);
    &::after {
      opacity: 0.8;
    }
  }
  opacity: 0;
  background-color: var(--v-secondary-darken1);
  width: 9px;
  height: 9px;
  border: 2px solid var(--v-accent-base);
  border-radius: 100%;
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 10;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    box-shadow: 0 -2.9px 2.2px var(--v-accent-base),
      0 -6.7px 5.3px var(--v-accent-base), 0 -12.5px 10px var(--v-accent-base),
      0 -22.3px 17.9px var(--v-accent-base),
      0 -41.8px 33.4px var(--v-accent-base), 0 -100px 80px var(--v-accent-base);
    transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover {
    &::after {
      border-radius: 100%;
      opacity: 0.1;
    }
    z-index: 11;
    opacity: 1;
    background-color: var(--v-secondary-base);
    border: 2px solid var(--v-scondary-darken1);
    cursor: pointer;
    //box-shadow: 0 -2.9px 2.2px var(--v-error-base),
    //  0 -6.7px 5.3px var(--v-error-base), 0 -12.5px 10px var(--v-error-base),
    //  0 -22.3px 17.9px var(--v-error-base), 0 -41.8px 33.4px var(--v-error-base),
    //  0 -100px 80px var(--v-error-base);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: scale(1.15, 1.15) translate(1px, -1px);
  }
}
</style>
