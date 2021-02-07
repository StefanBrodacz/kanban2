<template>
  <div style="width: 100%; height: 100%" @wheel="zoom" ref="zoomable">
    <svg width="100%" height="100%">
      <Link
        v-for="(link, statusId) in links"
        :key="`link${statusId}`"
        :originBox="link.origin"
        :links="link.target"
      />
    </svg>
    <Box
      v-for="(status, statusId) in flow.statuses"
      :key="statusId"
      :status="status"
    ></Box>
  </div>
</template>

<script>
import Link from "@/components/StatusFlow/Link";

import Box from "@/components/StatusFlow/Box";
import { mapState } from "vuex";
export default {
  name: "StatusFlow",
  data() {
    return {
      zX: 0
    };
  },
  components: { Link, Box },
  computed: {
    ...mapState({ flow: state => state.flow.statusFlow }),
    links() {
      let links = [];
      for (let status of this.flow.statuses) {
        if (status && status.link.length > 0) {
          links.push({ origin: status, target: status.link });
        }
      }
      console.log(links);
      return links;
    }
  },
  methods: {
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
    }
  }
};
</script>
<style lang="scss" scoped>
svg {
  shape-rendering: optimizeSpeed;
  position: relative;
  z-index: 101;
}
</style>
