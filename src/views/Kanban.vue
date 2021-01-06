<template>
  <div class="card-scene">
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".column-drag-handle"
      @drag-start="dragStart"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="column in scene.columns" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header column-drag-handle">
            p0----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
            {{ column.name }}
          </div>
          <Container
            group-name="col"
            @drop="e => onCardDrop(column.id, e)"
            @drag-start="e => log('drag start', e)"
            @drag-end="e => log('drag end', e)"
            :get-child-payload="getCardPayload(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in column.cards" :key="card.id">
              <div :class="card.props.className" :style="card.props.style">
                <p>{{ card.data }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import DragMixin from "@/mixins/DragMixin";

const scene = {
  type: "container",
  props: {
    orientation: "horizontal"
  },
  columns: [
    {
      id: 1,
      type: "container",
      name: "column name",
      props: {
        orientation: "vertical",
        className: "card-container"
      },
      cards: [
        {
          type: "draggable",
          id: 12,
          props: {
            className: "card",
            style: { backgroundColor: "blue" }
          },
          data: "card data4"
        },
        {
          type: "draggable",
          id: 13,
          props: {
            className: "card",
            style: { backgroundColor: "blue" }
          },
          data: "card data3"
        }
      ]
    },
    {
      id: 2,
      type: "container",
      name: "column name",
      props: {
        orientation: "vertical",
        className: "card-container"
      },
      cards: [
        {
          type: "draggable",
          id: 14,
          props: {
            className: "card",
            style: { backgroundColor: "blue" }
          },
          data: "card data2"
        },
        {
          type: "draggable",
          id: 15,
          props: {
            className: "card",
            style: { backgroundColor: "blue" }
          },
          data: "card data1"
        }
      ]
    }
  ]
};
export default {
  name: "Kanban",
  components: { Container, Draggable },
  data() {
    return {
      scene,
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
  mixins: [DragMixin],
  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene);
      scene.columns = this.applyDrag(scene.columns, dropResult);
      this.scene = scene;
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene);
        const column = scene.columns.filter(p => p.id === columnId)[0];
        const columnIndex = scene.columns.indexOf(column);

        const newColumn = Object.assign({}, column);
        newColumn.cards = this.applyDrag(newColumn.cards, dropResult);
        scene.columns.splice(columnIndex, 1, newColumn);

        this.scene = scene;
        console.log(this.scene);
      }
    },

    getCardPayload(columnId) {
      return index => {
        return this.scene.columns.filter(p => p.id === columnId)[0].cards[
          index
        ];
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

<style lang="scss" module></style>
