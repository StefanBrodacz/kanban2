<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragenter.prevent
    @mousedown.self="onStartDrag"
    @mouseup="onStopDrag"
    ref="draggableContainer"
    class="draggable-container rounded "
    style="z-index: 9"
    :style="{ top: y, left: x }"
  >
    {{ status.title }}
    <span class="box-badge">{{ status.id }}</span>
    <div class="inputs" ref="inputs">
      <SocketIn
        v-for="(linkNo, linkId) in flowConfig.sockets.in.topSocketsNumbers"
        :key="'socketIn' + linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="-6"
      />
      <SocketIn
        v-for="(linkNo, linkId) in flowConfig.sockets.in.bottomSocketsNumbers"
        :key="'socketIn' + linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="23"
      />
      <SocketOut
        v-for="(linkNo, linkId) in flowConfig.sockets.out.topSocketsNumbers"
        :key="linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="-6"
      />
      <SocketOut
        v-for="(linkNo, linkId) in flowConfig.sockets.out.bottomSocketsNumbers"
        :key="linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="23"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
      positions: {
        currentX: 0,
        currentY: 0,
        initialX: null,
        initialY: null
      },
      socketsGap: 9
    };
  },
  computed: {
    ...mapState({ flowConfig: state => state.flow.config }),
    x: function() {
      return this.status.position.x + "px";
    },
    y: function() {
      return this.status.position.y + "px";
    }
  },
  mounted() {
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
    onDrag(event) {
      event.preventDefault();
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      this.setDragPayload({
        originId: null,
        targetId: null,
        position: { x: 0, y: 0 },
        nodeIn: null
      });
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
        nodeIn: null,
        restoring: false
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
  padding: 3px 35px 4px 35px;
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
    opacity: 0.1;
    box-shadow: 0 2.9px 2.2px var(--v-primary-darken3),
      0 6.7px 5.3px var(--v-primary-darken3),
      0 12.5px 10px var(--v-primary-darken3),
      0 22.3px 17.9px var(--v-primary-darken3),
      0 41.8px 33.4px var(--v-primary-darken3),
      0 100px 80px var(--v-primary-darken3);
    z-index: -1;
    transition: all 1.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.draggable-container:hover {
  transform: scale(1, 1) rotate3d(1, 1, 1, 5deg);
  //transform: perspective(1500px) rotateY(25deg) translateX(1px) scale(1.1, 1.08);
  &::after {
    //box-shadow: 0 2.9px 2.2px var(--v-primary-darken3),
    //  0 6.7px 5.3px var(--v-primary-darken3),
    //  0 12.5px 10px var(--v-primary-darken3),
    //  0 22.3px 17.9px var(--v-primary-darken3),
    //  0 41.8px 33.4px var(--v-primary-darken3),
    //  0 100px 80px var(--v-primary-darken3);
    opacity: 0.2;
  }
}
.box-badge {
  font-size: xx-small;
  position: absolute;
  top: 5px;
  right: 2px;
  background-color: var(--v-accent-lighten2);
  border-radius: 100%;
  border: 1px solid var(--v-accent-base);
  min-width: 15px;
  min-height: 8px;
  text-align: center;
}
</style>
<style lang="scss">
.circle {
  box-shadow: 0 1.9px 6.2px -2.5px var(--v-primary-base);
}
</style>
