import KanbanService from "@/services/KanbanService";

import defaultBoard from "@/data/board";

export const namespaced = true;

const board = defaultBoard;

export const state = {
  board
};
export const mutations = {
  COLUMN_DROP(state, { rowId, dropResult }) {
    console.log(dropResult);
    applyDrag(state.board.rows[rowId].columns, dropResult);
  },
  CARD_DROP(state, { rowId, columnId, dropResult }) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const column = state.board.rows[rowId].columns.filter(
        p => p.id === columnId
      )[0];
      applyDrag(column.cards, dropResult);
    }
  }
};
export const actions = {
  dropColumn({ commit, state }, { rowId, dropResult }) {
    commit("COLUMN_DROP", { rowId, dropResult });
    return KanbanService.saveBoard(state.board)
      .then(() => {
        console.log("success");
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  },
  dropCard({ commit }, { rowId, columnId, dropResult }) {
    commit("CARD_DROP", { rowId, columnId, dropResult });
    console.log({ rowId, columnId, dropResult });
  }
};

function applyDrag(arr, dragResult) {
  console.log(arr);
  console.log(dragResult);
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
