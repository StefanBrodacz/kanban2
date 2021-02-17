<template>
  <v-container>
    <v-row>
      <Container
        orientation="horizontal"
        @drop="e => onColumnDrop({ rowId: 2, dropResult: e })"
        drag-handle-selector=".column-drag-handle"
        @drag-start="dragStart"
        :drop-placeholder="upperDropPlaceholderOptions"
      >
        <Draggable v-for="column in scene.rows[2].columns" :key="column.id">
          <v-col :class="`col-${12 / scene.rows[2].columns.length}`">
            <v-card outlined class="ma-1">
              <v-card-title class="column-drag-handle">
                {{ column.name }}
              </v-card-title>
              <v-card-text>
                <Container
                  group-name="col"
                  @drop="
                    e =>
                      onCardDrop({
                        rowId: 2,
                        columnId: column.id,
                        dropResult: e
                      })
                  "
                  @drag-start="e => log('drag start', e)"
                  @drag-end="e => log('drag end', e)"
                  :get-child-payload="getCardPayload(column.id)"
                  drag-class="card-ghost"
                  drop-class="card-ghost-drop"
                  :drop-placeholder="dropPlaceholderOptions"
                >
                  <Draggable v-for="card in column.cards" :key="card.id">
                    <v-card class="mb-1 ma-1 ticket" outlined>
                      <v-card-subtitle>
                        {{ card.data }}
                      </v-card-subtitle>
                      <v-card-text>
                        <v-row align="center" class="mx-0">
                          <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="14"
                          ></v-rating>

                          <div class="grey--text ml-4">
                            4.5 (413)
                          </div>
                          <div class="my-4 subtitle-1">
                            $ • Italian, Cafe
                          </div>

                          <div class="mb-5">
                            Small plates, salads & sandwiches - an intimate
                            setting with 12 indoor seats plus patio seating.
                          </div>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row
                          align="center"
                          class="font-weight-bold ml-8 mt-4 mb-2"
                          v-if="card.timeline"
                        >
                          {{ card.timeline.title }}
                        </v-row>
                        <v-timeline align-top dense v-if="card.timeline">
                          <v-timeline-item
                            v-for="message in card.timeline.messages"
                            :key="message.time"
                            :color="message.color"
                            small
                          >
                            <div>
                              <div class="font-weight-normal">
                                <strong>{{ message.from }}</strong> @{{
                                  message.time
                                }}
                              </div>
                              <div>{{ message.message }}</div>
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </v-card-text>
                    </v-card>
                  </Draggable>
                </Container>
              </v-card-text>
            </v-card>
          </v-col>
        </Draggable>
      </Container>
    </v-row>
  </v-container>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import DragMixin from "@/mixins/DragMixin";
import { mapActions, mapState } from "vuex";

export default {
  name: "Kanban",
  components: { Container, Draggable },
  data() {
    return {
      upperDropPlaceholderOptions: {
        className: "cards-drop-preview",
        animationDuration: "150",
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: true
      }
    };
  },
  computed: {
    ...mapState({ scene: state => state.board.board })
  },
  mixins: [DragMixin],
  methods: {
    ...mapActions({
      onColumnDrop: "board/dropColumn",
      onCardDrop: "board/dropCard"
    }),
    getCardPayload(columnId) {
      return index => {
        return this.scene.rows[2].columns.filter(p => p.id === columnId)[0]
          .cards[index];
      };
    },
    dragStart() {
      console.log("drag started");
    },

    log(...params) {
      console.info(...params);
    }
  }
};
</script>

<style lang="scss" scoped>
.container .smooth-dnd-container.horizontal {
  display: flex;
}
.column-drag-handle {
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.04;
    box-shadow: 0 2.9px 2.2px var(--v-accent-base),
      0 6.7px 5.3px var(--v-accent-base), 0 12.5px 10px var(--v-accent-base),
      0 22.3px 17.9px var(--v-accent-base), 0 41.8px 33.4px var(--v-accent-base),
      0 100px 80px var(--v-accent-base);
  }
}
.card-ghost {
  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
    box-shadow: 0 2.9px 2.2px var(--v-accent-base),
      0 6.7px 5.3px var(--v-accent-base), 0 12.5px 10px var(--v-accent-base),
      0 22.3px 17.9px var(--v-accent-base), 0 41.8px 33.4px var(--v-accent-base),
      0 100px 80px var(--v-accent-base);
  }
}
</style>
