<template>
  <svg width="100%" height="100%" ref="svg">
    <defs>
      <filter id="f1" x="0" y="0" width="200%" height="200%">
        <feOffset result="offOut" in="SourceGraphic" dx="6" dy="6" />
        <feColorMatrix
          result="matrixOut"
          in="offOut"
          type="matrix"
          values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
        />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
    </defs>
    <g v-for="(p, key) in renderedPathes" :key="key">
      <path
        :d="p.data"
        :style="p.style"
        class="link"
        :class="{ slow: isRestored }"
      ></path>
      <Plug
        :x="p.endPosition.x"
        :y="p.endPosition.y"
        :originId="p.originId"
        :targetId="p.targetId"
        :nodeIn="p.nodeIn"
        :class="{ slow: isRestored }"
      />
    </g>
  </svg>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Plug from "@/components/StatusFlow/Link/Plug";

export default {
  name: "Link",
  components: { Plug },
  props: {
    originBox: { type: Object, required: true },
    links: { type: Array, required: false }
  },

  methods: {
    distance(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    },
    ...mapActions({ removeLink: "flow/removeLink" }),
    targetBoxes(id) {
      return this.flow.statuses.find(box => {
        return box.id === id;
      });
    },
    findStatusesByTarget(targetId) {
      return this.flow.statuses.filter(status => {
        return status.link.find(link => {
          return link.targetId === targetId;
        });
      });
    },
    topSocketIndex(linkNo) {
      return this.flowConfig.sockets.in.topSocketsNumbers.findIndex(n => {
        return linkNo === n;
      });
    },
    bottomSocketIndex(linkNo) {
      return this.flowConfig.sockets.in.bottomSocketsNumbers.findIndex(n => {
        return linkNo === n;
      });
    },
    horizontalPosition(linkNo) {
      let socketIndex =
        this.topSocketIndex(linkNo) > -1
          ? this.topSocketIndex(linkNo)
          : this.bottomSocketIndex(linkNo);
      return (socketIndex + 1) * this.flowConfig.sockets.gap;
    },
    verticalPosition(linkNo) {
      return this.topSocketIndex(linkNo) > -1 ? 0 : 23;
    },
    thresholdY(linkNo) {
      let topIndex = this.flowConfig.sockets.out.topSocketsNumbers.findIndex(
        n => {
          return linkNo === n;
        }
      );
      if (topIndex > -1) return -17 - topIndex * 6;
      else {
        let botIndex = this.flowConfig.sockets.out.bottomSocketsNumbers.findIndex(
          n => {
            return linkNo === n;
          }
        );
        return (1 + botIndex) * 6 + 17;
      }
    }
  },
  computed: {
    ...mapState({
      flow: state => state.flow.statusFlow,
      dragPayload: state => state.flow.dragPayload,
      flowConfig: state => state.flow.config
    }),
    isRestored() {
      return this.dragPayload.restoring;
    },
    renderedPathes() {
      let pathes = [];

      let xOut = this.originBox.position.x + this.originBox.width;

      for (let link of this.links) {
        let y1 =
          this.originBox.position.y + this.verticalPosition(link.node.out);
        let x1 = xOut - this.horizontalPosition(link.node.out) + 4;
        let x2, y2;
        if (
          this.dragPayload.originId === this.originBox.id &&
          this.dragPayload.targetId === link.targetId &&
          this.dragPayload.nodeIn === link.in.socket
        ) {
          x2 = this.dragPayload.position.x;
          y2 = this.dragPayload.position.y;
        } else {
          if (typeof this.targetBoxes(link.targetId) === "undefined") {
            //occurs when newlly created link is dropped on box or socketOut
            for (let status of this.findStatusesByTarget(link.targetId)) {
              this.removeLink({ originId: status.id, targetId: link.targetId });
            }
            continue;
          }
          x2 =
            this.targetBoxes(link.targetId).position.x +
            this.horizontalPosition(link.in.socket) -
            4;

          y2 =
            this.targetBoxes(link.targetId).position.y +
            this.verticalPosition(link.in.socket);
        }

        pathes.push({
          data: `m ${x1} ${y1} l 0 ${this.thresholdY(link.node.out)} l ${x2 -
            x1} 0 L ${x2} ${y2}`,
          endPosition: { x: x2, y: y2 },
          originId: this.originBox.id,
          targetId: link.targetId,
          nodeIn: link.in.socket,
          style: {
            fill: "none"
          }
        });
      }
      return pathes;
    }
  }
};
</script>

<style lang="scss" scoped>
.slow {
  transition: 0.6s all cubic-bezier(0.15, 0.7, 0.94, 0.41);
}
.link {
  position: relative;
  z-index: -1;
  cursor: pointer;
  stroke: var(--v-primary-base) !important;
  stroke-linejoin: round;
  stroke-width: 1px;
  stroke-opacity: 1;
  stroke-dasharray: 3, 3;
  &:hover {
    //stroke: var(--v-error-base) !important;
    animation: dash 5s linear;
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: -400;
  }
}
</style>
