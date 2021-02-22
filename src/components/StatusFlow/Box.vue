<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragenter.prevent
    @mousedown.self="onStartDrag"
    @mouseup="onStopDrag"
    ref="draggableContainer"
    class="draggable-container "
    style="z-index: 9"
    :style="{ top: y, left: x }"
  >
    <div @dblclick="statusDbClick" @click.right.prevent="showStatusContextMenu">
      <v-badge bordered color="error" icon="mdi-lock" overlap>
        <v-text-field
          @mouseout="onMouseOut"
          @blur="onMouseOut"
          @keypress.enter="onMouseOut"
          :disabled="inputDisabled"
          :loading="inputLoading"
          :value="title"
          outlined
          dense
          :hide-details="inputDisabled"
          placeholder="Status name"
          counter="10"
          hint="Status name"
          autofocus
        ></v-text-field>
      </v-badge>
    </div>
    <div class="inputs" ref="inputs">
      <SocketIn
        v-for="(linkNo, linkId) in flowConfig.sockets.in.topSocketsNumbers"
        :key="'socketIn' + linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="-6"
        @plugged-in="pluggedIn"
      />
      <SocketIn
        @plugged-in="pluggedIn"
        v-for="(linkNo, linkId) in flowConfig.sockets.in.bottomSocketsNumbers"
        :key="'socketIn' + linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="status.height - 3"
      />
      <SocketOut
        @socket-right-click="(e, f) => emitUp('socket-right-click', e, f)"
        v-for="(linkNo, linkId) in flowConfig.sockets.out.topSocketsNumbers"
        :key="linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="-6"
      />
      <SocketOut
        @socket-right-click="(e, f) => emitUp('socket-right-click', e, f)"
        v-for="(linkNo, linkId) in flowConfig.sockets.out.bottomSocketsNumbers"
        :key="linkNo"
        :linkNo="linkNo"
        :link-id="linkId"
        :status="status"
        :top-position="status.height - 3"
      />
    </div>
    <StatusContextMenu
      @edit-title="inputDisabled = false"
      @remove-status="removeStatus(status.id)"
      :show-menu="statusContextMenu.showMenu"
      :payload="statusContextMenu.contextMenuPayload"
      :mouse-event="statusContextMenu.mouseEvent"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SocketOut from "@/components/StatusFlow/Link/SocketOut";
import SocketIn from "@/components/StatusFlow/Link/SocketIn";
import StatusContextMenu from "@/components/StatusFlow/StatusContextMenu";

export default {
  name: "Box",
  components: { StatusContextMenu, SocketIn, SocketOut },
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
      height: 0,
      statusContextMenu: {
        showMenu: false,
        mouseEvent: null,
        contextMenuPayload: null
      },
      inputDisabled: true,
      inputLoading: false,
      hideDetails: true
    };
  },
  computed: {
    ...mapState({ flowConfig: state => state.flow.config }),
    x: function() {
      return this.status.position.x + "px";
    },
    y: function() {
      return this.status.position.y + "px";
    },
    title() {
      return this.status.title;
    }
  },
  mounted() {
    if (!this.status.width || !this.status.height)
      this.$nextTick(function() {
        this.height = this.$refs.draggableContainer.clientHeight;
        this.setDimension({
          statusId: this.status.id,
          width: this.$refs.draggableContainer.clientWidth,
          height: this.height
        });
      });
  },
  methods: {
    pluggedIn() {
      this.markLoading();
    },
    statusDbClick() {
      this.inputDisabled = false;
    },
    markLoading() {
      this.inputLoading = "info";
      setTimeout(() => {
        this.inputLoading = false;
      }, 1000);
    },
    onMouseOut() {
      console.log("asdf");
      if (!this.inputDisabled) {
        this.markLoading();
        this.inputDisabled = true;
      }
    },
    showStatusContextMenu(e) {
      this.statusContextMenu = {
        showMenu: true,
        mouseEvent: e,
        contextMenuPayload: null
      };
    },
    ...mapActions({
      dragStatus: "flow/dragStatus",
      setDimension: "flow/setDimension",
      setDragPayload: "flow/setDragPayload",
      removeStatus: "flow/removeStatus"
    }),
    emitUp(eventName, mouseEvent, payload) {
      this.$emit(eventName, mouseEvent, payload);
    },
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
      this.$refs.draggableContainer.style["z-index"] = 100;
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
  color: var(--v-primary-base);
  background-color: var(--v-secondary-lighten1);
  //padding: 3px 35px 4px 35px;
  //transform: scale(1, 1) rotate3d(1, 1, 1, 0deg);
  transition: box-shadow 300ms, transform 300ms,
    background-color 0.1s cubic-bezier(0, 0.48, 1, 0.73);
  border-color: var(--v-primary-lighten5);
  //border-width: 1px;
  border-radius: 3px;
  //stroke-linejoin: round;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    border-radius: 10px;
    box-shadow: 0 2.9px 2.2px var(--v-primary-darken4),
      0 6.7px 5.3px var(--v-primary-darken1),
      0 12.5px 10px var(--v-primary-darken2),
      0 22.3px 17.9px var(--v-primary-darken2),
      0 41.8px 33.4px var(--v-primary-darken3),
      0 100px 80px var(--v-primary-darken3);
    z-index: -1;
    transition: all 1.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  & .v-input {
    background-color: var(--v-secondary-lighten1);
    font-size: small;
  }
}
.v-text-field__details {
  background-color: black !important;
}

input {
  text-align: center !important;
}

.draggable-container:hover {
  //transform: scale(1, 1) rotate3d(1, 1, 1, 5deg);
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
