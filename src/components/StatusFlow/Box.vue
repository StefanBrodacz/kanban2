<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragenter.prevent
    @mousedown.self="onStartDrag"
    @mouseup="onStopDrag"
    @mouseover.self="mouseOver"
    @mouseout="mouseOut"
    ref="draggableContainer"
    id=""
    class="draggable-container rounded "
    style="z-index: 9"
    :style="{ top: y, left: x }"
  >
    {{ status.title }}
    <div class="inputs" ref="inputs">
      <SocketIn
        v-for="id in configSockets"
        :key="'in' + id"
        :linkNo="id"
        :status="status"
      />
      <SocketOut
        v-for="id in configSockets"
        :key="id"
        :linkNo="id"
        :status="status"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import SocketOut from "@/components/StatusFlow/Link/SocketOut";
import SocketIn from "@/components/StatusFlow/Link/SocketIn";

export default {
  name: "Box",
  components: { SocketIn, SocketOut },
  props: {
    status: { type: Object, required: true }
  },
  data: function() {
    return {
      configSockets: [1, 2, 3, 4, 5],
      positions: {
        currentX: 0,
        currentY: 0,
        initialX: null,
        initialY: null
      }
    };
  },
  computed: {
    x: function() {
      return this.status.position.x + "px";
    },
    y: function() {
      return this.status.position.y + "px";
    }
  },
  mounted() {
    // this.$refs.draggableContainer.style.top = this.y + "px";
    // this.$refs.draggableContainer.style.left = this.x + "px";
    this.$nextTick(function() {
      this.setWidth({
        statusId: this.status.id,
        width: this.$refs.draggableContainer.clientWidth
      });
    });
  },
  methods: {
    ...mapActions({
      dragStatus: "flow/dragStatus",
      setWidth: "flow/setWidth",
      setDragPayload: "flow/setDragPayload"
    }),
    mouseOver() {
      // this.$refs.inputs.style.opacity = 1;
    },
    mouseOut() {
      // this.$refs.inputs.style.opacity = 0;
    },
    onDrag(event) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;

      document.onmousemove = this.onMove;
      document.onmouseup = this.onStopDrag;
    },
    onMove(event) {
      event.preventDefault();

      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;

      let x =
        this.$refs.draggableContainer.offsetLeft - this.positions.movementX;
      let y =
        this.$refs.draggableContainer.offsetTop - this.positions.movementY;
      this.dragStatus({ statusId: this.status.id, position: { x: x, y: y } });
      this.$refs.draggableContainer.style.left = x + "px";
      this.$refs.draggableContainer.style.top = y + "px";
    },
    onStopDrag() {
      this.$refs.draggableContainer.style["z-index"] = 9;

      document.onmouseup = null;
      document.onmousemove = null;

      this.setDragPayload({
        originId: null,
        targetId: null,
        position: { x: 0, y: 0 },
        nodeIn: null
      });
    },
    onStartDrag() {
      this.$refs.draggableContainer.style["z-index"] = 100;
    }
  }
};
</script>
<style lang="scss" scoped>
.draggable-container {
  cursor: move !important;
  position: absolute;
  z-index: 9;
  min-width: 100px;
  text-align: center;
  color: var(--v-primary-base);
  background-color: var(--v-secondary-base);
  padding: 3px 15px 4px 15px;
  //transform: scale(1, 1) rotate3d(1, 1, 1, 0deg);
  transition: box-shadow 300ms, transform 300ms;
  border-color: var(--v-primary-lighten5);
  border-width: 0.1px;
  font-size: small;
  stroke-linejoin: round;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    box-shadow: 0 2.9px 2.2px var(--v-accent-base),
      0 6.7px 5.3px var(--v-accent-base), 0 12.5px 10px var(--v-accent-base),
      0 22.3px 17.9px var(--v-accent-base), 0 41.8px 33.4px var(--v-accent-base),
      0 100px 80px var(--v-accent-base);
    z-index: -1;
    transition: all 1.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.draggable-container:hover {
  transform: scale(1.05, 1.05) rotate3d(1, 1, 1, 10deg);
  &::after {
    box-shadow: 0 2.9px 2.2px var(--v-accent-base),
      0 6.7px 5.3px var(--v-accent-base), 0 12.5px 10px var(--v-accent-base),
      0 22.3px 17.9px var(--v-accent-base), 0 41.8px 33.4px var(--v-accent-base),
      0 100px 80px var(--v-accent-base);
    opacity: 0.3;
  }
}
</style>
