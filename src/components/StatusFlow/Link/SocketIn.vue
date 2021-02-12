<template>
  <div
    @mouseup="dropped"
    @mousedown.prevent
    class="inputSlot circle"
    :class="{ active: isActive }"
    :style="{ top: '-6px', left: `${socketsGap * linkNo - 8}px` }"
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
    linkNo: { type: Number }
  },
  data: function() {
    return {
      socketsGap: 9
    };
  },
  computed: {
    ...mapState({
      flow: state => state.flow.statusFlow,
      dragPayload: state => state.flow.dragPayload
    }),
    outStatus() {
      return this.findStatusByTarget(this.status.id);
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
    }
  },
  methods: {
    ...mapActions({
      findStatusByTarget: "flow/findStatusByTarget",
      plugin: "flow/plugin"
    }),
    debug() {
      console.log(this.status);
      console.log(this.findStatusByTarget(this.status.id));
      console.log(this.linkNo);
    },
    dropped() {
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
  }
  opacity: 0;
  background-color: var(--v-secondary-base);
  width: 9px;
  height: 9px;
  border: 1px solid var(--v-primary-lighten3);
  border-radius: 100%;
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 10;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    box-shadow: 0 -2.9px 2.2px var(--v-accent-base),
      0 -6.7px 5.3px var(--v-accent-base), 0 -12.5px 10px var(--v-accent-base),
      0 -22.3px 17.9px var(--v-accent-base),
      0 -41.8px 33.4px var(--v-accent-base), 0 -100px 80px var(--v-accent-base);
  }

  &:hover {
    z-index: 11;
    opacity: 1;

    background-color: var(--v-secondary-base);
    border: 1px solid var(--v-scondary-darken1);

    cursor: pointer;
    box-shadow: 0 -2.9px 2.2px var(--v-accent-base),
      0 -6.7px 5.3px var(--v-accent-base), 0 -12.5px 10px var(--v-accent-base),
      0 -22.3px 17.9px var(--v-accent-base),
      0 -41.8px 33.4px var(--v-accent-base), 0 -100px 80px var(--v-accent-base);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: scale(1.15, 1.15) translate(1px, -2px);
  }
}
</style>
