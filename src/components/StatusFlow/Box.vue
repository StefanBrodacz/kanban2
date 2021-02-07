<template>
  <div
    draggable
    @dragstart="onDrag"
    @dragenter.prevent
    @mousedown.self="onStartDrag"
    @mouseup="onStopDrag"
    @mouseover="mouseOver"
    @mouseout="mouseOut"
    ref="draggableContainer"
    id=""
    class="draggable-container rounded "
    style="z-index: 9"
  >
    {{ status.title }}
    <div class="inputs" ref="inputs">
      <div class="inputSlot circle" style="top:-5px; left: 1px"></div>
      <div class="inputSlot circle" style="top:-4px; left: 9px"></div>
      <div class="inputSlot circle" style="top:-4px; left: 17px"></div>
      <div class="inputSlot circle" style="top:-4px; left: 25px"></div>
      <div class="inputSlot circle" style="top:-4px; left: 33px"></div>
      <div class="inputSlot circle" style="top:23px; left: 1px"></div>
      <div class="inputSlot circle" style="top:23px; left: 9px"></div>
      <div class="inputSlot circle" style="top:23px; left: 17px"></div>
      <div class="inputSlot circle" style="top:23px; left: 25px"></div>
      <div class="inputSlot circle" style="top:23px; left: 33px"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Box",
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
      }
    };
  },
  mounted() {
    this.$refs.draggableContainer.style.top = this.status.position.y + "px";
    this.$refs.draggableContainer.style.left = this.status.position.x + "px";
    this.setWidth({
      statusId: this.status.id,
      width: this.$refs.draggableContainer.clientWidth
    });
  },
  methods: {
    ...mapActions({ dragStatus: "flow/dragStatus", setWidth: "flow/setWidth" }),
    mouseOver() {
      // this.$refs.inputs.style.opacity = 1;
    },
    mouseOut() {
      this.$refs.inputs.style.opacity = 0;
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
    },
    onStartDrag() {
      this.$refs.draggableContainer.style["z-index"] = 100;
    }
  }
};
</script>
<style lang="scss" scoped>
.draggable-container {
  /*transform: rotate3d(1, 1, 1, 45deg);*/
  cursor: move !important;
  position: absolute;
  z-index: 9;
  min-width: 100px;
  text-align: center;
  color: var(--v-primary-base);
  background-color: var(--v-secondary-base);
  padding: 3px 15px 4px 15px;
  //box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);

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
    box-shadow: 0 2.9px 2.2px var(--v-primary-base),
      0 6.7px 5.3px var(--v-primary-base), 0 12.5px 10px var(--v-primary-base),
      0 22.3px 17.9px var(--v-primary-base),
      0 41.8px 33.4px var(--v-primary-base), 0 100px 80px var(--v-primary-base);
    z-index: -1;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.draggable-container:hover {
  //transform: scale(1.1, 1.1);
  &::after {
    box-shadow: 0 2.9px 2.2px var(--v-primary-base),
      0 6.7px 5.3px var(--v-primary-base), 0 12.5px 10px var(--v-primary-base),
      0 22.3px 17.9px var(--v-primary-base),
      0 41.8px 33.4px var(--v-primary-base), 0 100px 80px var(--v-primary-base);
    opacity: 0.3;
  }
}
.hook {
  inset: auto auto calc(100% - 12px) calc(100% - 12px);
  background-color: #aabbcc;
  border-radius: 10px;
  color: cornflowerblue;
  font-size: 12px;
  height: 20px;
  letter-spacing: 0;
  min-width: 20px;
  padding: 4px 6px;
  pointer-events: auto;
  position: absolute;
  text-align: center;
  text-indent: 0;
  top: 20%;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  white-space: nowrap;
  border: 1px solid #fff;
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.hook:hover {
  background-color: cornflowerblue;
  border: 1px solid #fff;
}

.inputs {
  opacity: 0;
  transition: opacity 0.4s;
  .inputSlot {
    position: absolute;
  }
  .circle {
    background-color: var(--v-secondary-base);
    //box-sizing: border-box;
    width: 8px;
    height: 8px;
    border: 1px solid var(--v-primary-lighten3);
    border-radius: 100%;
    opacity: 1;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}
</style>
