<template>
  <v-container fluid>
    <v-expansion-panels multiple focusable popout>
      <v-expansion-panel v-for="(row, rowId) in scene.rows" :key="rowId">
        <v-expansion-panel-header>
          <v-container>
            <v-row>
              <v-col class="header-title">{{ row.title }}</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col
                class="header-columns"
                :class="`col-${12 / row.columns.length}`"
                v-for="column in row.columns"
                :key="column.id"
              >
                <span class="column-name">{{ column.name }}: </span>
                <span class="column-length">{{ column.cards.length }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col
                :class="`col-${12 / row.columns.length}`"
                v-for="column in row.columns"
                :key="column.id"
              >
                <Container
                  group-name="col"
                  @drop="
                    e =>
                      onCardDrop({
                        rowId: rowId,
                        columnId: column.id,
                        dropResult: e
                      })
                  "
                  @drag-start="e => log('drag start', e)"
                  @drag-end="e => log('drag end', e)"
                  :get-child-payload="getCardPayload(rowId, column.id)"
                  drag-class="card-ghost"
                  drop-class="card-ghost-drop"
                  :drop-placeholder="dropPlaceholderOptions"
                >
                  <Draggable v-for="card in column.cards" :key="card.id">
                    <v-card class="mb-1 ma-1" outlined flat>
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
                        <v-expansion-panels v-if="card.timeline" accordion flat>
                          <v-expansion-panel>
                            <v-expansion-panel-header>{{
                              card.timeline.title
                            }}</v-expansion-panel-header>
                            <v-expansion-panel-content>
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
                            </v-expansion-panel-content>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </v-card-text>
                    </v-card>
                  </Draggable>
                </Container>
              </v-col>
            </v-row>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import DragMixin from "@/mixins/DragMixin";
import { mapActions, mapState } from "vuex";

export default {
  name: "Kanban-2",
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

    getCardPayload(rowId, columnId) {
      return index => {
        return this.scene.rows[rowId].columns.filter(p => p.id === columnId)[0]
          .cards[index];
      };
    },
    dragStart() {
      console.log("drag started");
    },

    log(...params) {
      console.log(...params);
    }
  }
};
</script>

<style lang="scss" scoped>
.container .smooth-dnd-container.horizontal {
  display: flex;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
  box-shadow: 0 0 0 0;
}
.v-expansion-panel-content__wrap {
  padding: 0;
}
.v-card__subtitle,
.v-card__text,
.v-card__title {
  padding: 2px 10px 2px 10px;
}
.col-6 {
  padding: 2px;
}
.header-columns {
  text-align: center;
  margin-top: 15px;
  margin-bottom: -10px;
}
.v-expansion-panel {
  margin-bottom: 10px;
}
.column-name {
  font-variant-caps: small-caps;
}
.column-length {
  font-variant-caps: all-small-caps;
}
.header-title {
  text-align: center;
  margin-top: -10px;
  margin-bottom: 15px;
  font-weight: bold;
}
</style>
