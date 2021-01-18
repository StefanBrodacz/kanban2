import KanbanService from "@/services/KanbanService";

import defaultBoard from "@/data/board";

export const namespaced = true;

const board = defaultBoard;

export const state = {
  board
};
export const mutations = {
  COLUMN_DROP(state, dropResult) {
    applyDrag(state.board.columns, dropResult);
  },
  CARD_DROP(state, { columnId, dropResult }) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const column = state.board.columns.filter(p => p.id === columnId)[0];
      applyDrag(column.cards, dropResult);
    }
  }
};
export const actions = {
  dropColumn({ commit, state }, dropResult) {
    commit("COLUMN_DROP", dropResult);
    return KanbanService.saveBoard(state.board)
      .then(() => {
        console.log("success");
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  },
  dropCard({ commit }, { columnId, dropResult }) {
    commit("CARD_DROP", { columnId, dropResult });
  }
};

function applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;
  let itemToAdd = payload;
  if (removedIndex !== null) {
    itemToAdd = arr.splice(removedIndex, 1)[0];
  }
  if (addedIndex !== null) {
    arr.splice(addedIndex, 0, itemToAdd);
  }
}
