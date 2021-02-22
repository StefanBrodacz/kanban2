<template>
  <div @wheel="zoom" ref="zoomable" id="viewport">
    <svg
      @click.right.prevent="onRightClick"
      @mousedown.middle.self="mouseMiddleDown"
      width="100%"
      height="100%"
    >
      <Link
        v-for="(link, statusId) in links"
        :key="`link${statusId}`"
        :originBox="link.origin"
        :links="link.target"
      />
    </svg>
    <Box
      @socket-right-click="socketEvent"
      v-for="(status, statusId) in flow.statuses"
      :key="statusId"
      :status="status"
    ></Box>
    <SocketContextMenu
      :show-menu="socketContextMenu.showMenu"
      :payload="socketContextMenu.contextMenuPayload"
      :mouse-event="socketContextMenu.mouseEvent"
    />
    <FlowContextMenu
      :show-menu="flowContextMenu.showMenu"
      :payload="flowContextMenu.contextMenuPayload"
      :mouse-event="flowContextMenu.mouseEvent"
    />
  </div>
</template>

<script>
import Link from "@/components/StatusFlow/Link";

import Box from "@/components/StatusFlow/Box";
import { mapActions, mapState } from "vuex";
import SocketContextMenu from "@/components/StatusFlow/SocketContextMenu";
import FlowContextMenu from "@/components/StatusFlow/FlowContextMenu";
export default {
  name: "StatusFlow",
  data() {
    return {
      dialog: true,
      zX: 0,
      viewStartPosition: { x: 0, y: 0 },
      socketContextMenu: {
        showMenu: false,
        mouseEvent: null,
        contextMenuPayload: null
      },
      flowContextMenu: {
        showMenu: false,
        mouseEvent: null,
        contextMenuPayload: null
      }
    };
  },
  components: { FlowContextMenu, SocketContextMenu, Link, Box },
  mounted() {
    let rect = this.$refs.zoomable.getBoundingClientRect();
    this.setViewportOffset({ x: rect.left, y: rect.top });
  },
  computed: {
    ...mapState({
      flow: state => state.flow.statusFlow,
      dragPayload: state => state.flow.dragPayload
    }),
    links() {
      let links = [];
      for (let status of this.flow.statuses) {
        if (status && status.link.length > 0) {
          links.push({ origin: status, target: status.link });
        }
      }
      return links;
    }
  },
  methods: {
    ...mapActions({
      setViewportOffset: "flow/setViewportOffset",
      dragView: "flow/dragView",
      editViewport: "flow/editViewport",
      setDragPayload: "flow/setDragPayload"
    }),
    socketEvent(mouseevent, payload) {
      this.socketContextMenu.showMenu = true;
      this.socketContextMenu.mouseEvent = mouseevent;
      this.socketContextMenu.contextMenuPayload = payload;
    },
    onRightClick(e) {
      this.flowContextMenu.showMenu = true;
      this.flowContextMenu.mouseEvent = e;
      this.flowContextMenu.contextMenuPayload = {};
    },
    zoom(e) {
      let zoomable = this.$refs.zoomable;

      let dir;
      if (!e.altKey) {
        return;
      }
      dir = e.wheelDelta > 0 ? 0.1 : -0.1;
      this.zX += dir;
      for (let i = 0; i < zoomable.getElementsByTagName("*").length; i++) {
        zoomable.getElementsByTagName("*")[i].style.transform =
          "scale(" + this.zX + ")";
      }

      e.preventDefault();
    },
    mouseMiddleDown(e) {
      this.viewStartPosition.x = e.x;
      this.viewStartPosition.y = e.y;
      this.editViewport({ moving: true });
      this.setDragPayload({
        originId: null,
        targetId: null,
        position: { x: 0, y: 0 },
        nodeIn: null
      });
      document.onmousemove = this.onViewMove;
      document.onmouseup = this.onViewStopDrag;
    },
    onViewMove(e) {
      let xMove = this.viewStartPosition.x - e.x;
      let yMove = this.viewStartPosition.y - e.y;
      this.viewStartPosition.x = e.x;
      this.viewStartPosition.y = e.y;
      this.dragView({ x: xMove, y: yMove });
    },
    onViewStopDrag() {
      this.editViewport({ moving: false });
      document.onmousemove = null;
      document.onmouseup = null;
    },
    ontop() {
      return this.dragPayload.originId !== null;
    }
  }
};
</script>
<style lang="scss" scoped>
#viewport {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
}
svg {
  shape-rendering: optimizeSpeed;
  position: relative;
  z-index: 1;
}
.ontop {
  z-index: 101;
}
</style>
