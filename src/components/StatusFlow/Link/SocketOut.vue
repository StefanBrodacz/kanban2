<template>
  <div
    draggable
    @mousedown="onPlugDown"
    ref="socket"
    class="inputSlot circle"
    :class="{ active: isActive }"
    :style="{ top: '-6px', right: `${socketsGap * linkNo - 4}px` }"
  ></div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SocketOut",
  props: {
    status: {
      type: Object
    },
    linkNo: { type: Number }
  },
  data: function() {
    return {
      socketsGap: 9
    };
  },
  computed: {
    ...mapState({ config: state => state.flow.config }),
    link() {
      return this.status.link.find(link => {
        return link.node.out === this.linkNo;
      });
    },
    isActive() {
      return typeof this.link !== "undefined";
    }
  },
  methods: {
    overDebug(e) {
      console.log(e.y);
    },
    dragstart() {
      console.log("dragstart");
    },
    ...mapActions({
      setDragPayload: "flow/setDragPayload"
    }),
    onPlugDown(e) {
      e.preventDefault();
      document.onmousemove = this.onPlugMove;
      document.onmouseup = this.plugStopDrag;
    },
    onPlugMove(e) {
      if (this.isActive)
        this.setDragPayload({
          originId: this.status.id,
          targetId: this.link.targetId,
          position: { x: e.x, y: e.y },
          nodeIn: this.link.in.socket
        });
    },
    plugStopDrag() {
      if (this.isActive)
        this.setDragPayload({
          originId: null,
          targetId: null,
          position: { x: 0, y: 0 },
          nodeIn: null
        });
      document.onmousemove = null;
      document.onmouseup = null;
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
    background-color: var(--v-error-base);
  }
  opacity: 0;
  background-color: var(--v-secondary-darken1);
  width: 9px;
  height: 9px;
  border: 1px solid var(--v-error-base);
  border-radius: 100%;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 10;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    box-shadow: 0 -2.9px 2.2px var(--v-error-base),
      0 -6.7px 5.3px var(--v-error-base), 0 -12.5px 10px var(--v-error-base),
      0 -22.3px 17.9px var(--v-error-base), 0 -41.8px 33.4px var(--v-error-base),
      0 -100px 80px var(--v-error-base);
  }
  &:hover {
    opacity: 1;

    background-color: var(--v-secondary-base);
    cursor: pointer;
    box-shadow: 0 -2.9px 2.2px var(--v-error-base),
      0 -6.7px 5.3px var(--v-error-base), 0 -12.5px 10px var(--v-error-base),
      0 -22.3px 17.9px var(--v-error-base), 0 -41.8px 33.4px var(--v-error-base),
      0 -100px 80px var(--v-error-base);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: scale(1.15, 1.15) translate(1px, -2px);
  }
}
</style>
