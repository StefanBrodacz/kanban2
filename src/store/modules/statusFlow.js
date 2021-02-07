export const namespaced = true;
import defaultStatusFlow from "@/data/statusFlow";
const statusFlow = defaultStatusFlow;
export const state = {
  statusFlow
};
export const mutations = {
  CHANGE_POSITION(state, { statusId, position }) {
    let status = state.statusFlow.statuses.find(status => {
      return status.id === statusId;
    });
    status.position = position;
  },
  SET_WIDTH(state, { statusId, width }) {
    let status = state.statusFlow.statuses.find(status => {
      return status.id === statusId;
    });
    status.width = width;
  },
  SET_TARGET_LINK_POSITION(state, { originId, targetId, position, nodeIn }) {
    state.statusFlow.statuses
      .find(status => {
        return status.id === originId;
      })
      .link.find(link => {
        return link.targetId === targetId && link.in.socket === nodeIn;
      }).in.position = position;
  }
};
export const actions = {
  dragStatus({ commit }, { statusId, position }) {
    commit("CHANGE_POSITION", { statusId, position });
  },
  setWidth({ commit }, { statusId, width }) {
    commit("SET_WIDTH", { statusId, width });
  },
  setTargetLinkPosition({ commit }, { originId, targetId, position, nodeIn }) {
    commit("SET_TARGET_LINK_POSITION", {
      originId,
      targetId,
      position,
      nodeIn
    });
  }
};
