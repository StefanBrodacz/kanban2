<template>
  <div
    @click.right.prevent="
      $emit('socket-right-click', $event, {
        originId: status.id,
        linkId: isPlugged ? link.targetId : 0
      })
    "
    @mousedown.left="onPlugDown"
    ref="socket"
    class="inputSlot circle"
    :class="{ active: isPlugged }"
    :style="{ top: `${topPosition}px`, right: `${horizontalPosition + 4}px` }"
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
    linkNo: { type: Number },
    linkId: { type: Number },
    topPosition: { type: Number }
  },
  data: function() {
    return {
      socketsGap: 9,
      pluggedTemporary: false
    };
  },
  computed: {
    ...mapState({ flowConfig: state => state.flow.config }),
    horizontalPosition() {
      return (
        this.flowConfig.sockets.gap * this.linkId +
        2 +
        this.flowConfig.sockets.margin
      );
    },
    link() {
      return this.status.link.find(link => {
        return link.node.out === this.linkNo;
      });
    },
    isPlugged() {
      return typeof this.link !== "undefined";
    },
    targetId() {
      return typeof this.link !== "undefined" ? this.link.targetId : 0;
    },
    linkIn() {
      return typeof this.link !== "undefined" ? this.link.in.socket : 0;
    }
  },
  watch: {
    linkIn() {
      document.onmousemove = null;
      document.onmouseup = null;
      this.pluggedTemporary = false;
    }
  },
  methods: {
    ...mapActions({
      setDragPayload: "flow/setDragPayload",
      addLink: "flow/addLink",
      removeLink: "flow/removeLink"
    }),
    onPlugDown(e) {
      e.preventDefault();
      document.onmousemove = this.onPlugMove;
      document.onmouseup = this.plugStopDrag;
      if (!this.isPlugged) {
        this.addLink({
          originId: this.status.id,
          targetId: this.targetId,
          outSocket: this.linkNo
        });
        this.pluggedTemporary = true;
      }
      this.setDragPayload({
        originId: this.status.id,
        targetId: this.targetId,
        position: { x: e.x, y: e.y },
        nodeIn: this.linkIn,
        restoring: true
      });
    },
    onPlugMove(e) {
      this.setDragPayload({
        originId: this.status.id,
        targetId: this.targetId,
        position: { x: e.x, y: e.y },
        nodeIn: this.linkIn,
        restoring: null
      });
    },
    plugStopDrag() {
      if (this.pluggedTemporary) {
        this.removeLink({ originId: this.status.id, targetId: this.targetId });
        this.pluggedTemporary = false;
      }
      this.setDragPayload({
        originId: null,
        targetId: null,
        position: { x: 0, y: 0 },
        nodeIn: null,
        restoring: true
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
    &::after {
      opacity: 0.8;
    }
  }
  opacity: 0;
  background-color: var(--v-secondary-darken1);
  width: 9px;
  height: 9px;
  border: 2px solid var(--v-error-base);
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
    box-shadow: 0 -2.9px 2.2px var(--v-error-base),
      0 -6.7px 5.3px var(--v-error-base), 0 -12.5px 10px var(--v-error-base),
      0 -22.3px 17.9px var(--v-error-base), 0 -41.8px 33.4px var(--v-error-base),
      0 -100px 80px var(--v-error-base);
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
    transform: scale(1.35, 1.35) translate(1px, -1px);
  }
}
</style>
