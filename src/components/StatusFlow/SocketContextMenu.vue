<template>
  <v-menu
    :position-x="x"
    :position-y="y"
    absolute
    offset-y
    v-model="show"
    style="max-width: 200px"
  >
    <v-list dense outlined>
      <v-list-item-group>
        <v-list-item :disabled="!isPlugged">
          <v-list-item-title
            @click="
              removeLink({
                originId: payload.originId,
                targetId: payload.linkId
              })
            "
            >Remove Link</v-list-item-title
          >
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SocketContextMenu",
  props: {
    showMenu: { type: Boolean },
    payload: { type: Object },
    mouseEvent: { type: MouseEvent }
  },
  data() {
    return {
      show: false
    };
  },
  watch: {
    x() {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      flow: state => state.flow.statusFlow
    }),
    x() {
      return this.mouseEvent !== null ? this.mouseEvent.clientX : 0;
    },
    y() {
      return this.mouseEvent !== null ? this.mouseEvent.clientY : 0;
    },
    isPlugged() {
      if (this.payload !== null) {
        return (
          this.flow.statuses
            .find(status => {
              return status.id === this.payload.originId;
            })
            .link.find(link => {
              return link.targetId === this.payload.linkId;
            }) !== undefined
        );
      }
      return false;
    }
  },
  methods: {
    ...mapActions({ removeLink: "flow/removeLink" })
  }
};
</script>

<style lang="scss" module></style>
