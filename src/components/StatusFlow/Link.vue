<template>
  <svg width="100%" height="100%">
    <g v-for="(p, key) in renderedPathes" :key="key">
      <path :d="p.data" :style="p.style" class="link"></path>
      <Plug
        :x="p.endPosition.x"
        :y="p.endPosition.y"
        :originId="p.originId"
        :targetId="p.targetId"
        :nodeIn="p.nodeIn"
      />
    </g>
  </svg>
</template>

<script>
import { mapState } from "vuex";
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
    targetBoxes(id) {
      return this.flow.statuses.find(box => {
        return box.id === id;
      });
    }
  },
  computed: {
    ...mapState({ flow: state => state.flow.statusFlow }),
    renderedPathes() {
      let pathes = [];

      let xOut = this.originBox.position.x + this.originBox.width / 2;
      let originGap = this.originBox.width / 12;
      let y = this.originBox.position.y;

      for (let link of this.links) {
        let x2 = link.in.position.x;
        let y2 = link.in.position.y;
        pathes.push({
          data: `m ${xOut + link.node.out * originGap} ${y} l 0 ${-10 -
            link.node.out * 4} l ${x2 -
            xOut -
            link.node.out * originGap} 0 L ${x2} ${y2}`,
          endPosition: { x: x2, y: y2 },
          originId: this.originBox.id,
          targetId: link.targetId,
          nodeIn: link.in.socket,
          style: {
            strokeWidth: 1,
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
.link {
  position: relative;
  z-index: -1;
  cursor: pointer;
  stroke: #999999 !important;
  stroke-linejoin: round;
  stroke-dasharray: 3;
  &:hover {
    stroke: #64ffda !important;
    animation: dash2 15s linear;
  }
  animation: dash 15s linear;
}

@keyframes dash {
  to {
    stroke-dashoffset: -400;
  }
}
</style>
