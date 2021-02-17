export const namespaced = true;
import defaultStatusFlow from "@/data/statusFlow";
const statusFlow = defaultStatusFlow;
const dragPayload = {
  originId: null,
  targetId: null,
  nodeIn: null,
  position: { x: null, y: null },
  restoring: false
};
const config = {
  viewportOffset: { x: 0, y: 0 },
  sockets: {
    gap: 9,
    in: {
      topSocketsNumbers: [1, 2, 3, 4, 5, 11],
      bottomSocketsNumbers: [6, 7, 8, 9, 10, 12]
    },
    out: {
      topSocketsNumbers: [1, 2, 3, 4, 5, 11],
      bottomSocketsNumbers: [6, 7, 8, 9, 10, 12]
    }
  }
};
const viewport = {
  moving: false
};
export const state = {
  statusFlow,
  dragPayload,
  viewport,
  config
};
export const mutations = {
  CHANGE_POSITION(state, { statusId, position }) {
    let status = state.statusFlow.statuses.find(status => {
      return status.id === statusId;
    });
    status.position = position;
  },
  MOVE_VIEW(state, { position }) {
    for (let status of state.statusFlow.statuses) {
      status.position.x -= position.x;
      status.position.y -= position.y;
    }
  },
  SET_WIDTH(state, { statusId, width }) {
    let status = state.statusFlow.statuses.find(status => {
      return status.id === statusId;
    });
    status.width = width;
  },
  SET_TARGET_LINK_POSITION(state, { originId, targetId, nodeIn, position }) {
    state.statusFlow.statuses
      .find(status => {
        return status.id === originId;
      })
      .link.find(link => {
        return link.targetId === targetId && link.in.socket === nodeIn;
      }).in.position = position;
  },
  PLUGIN(state, { originId, oldTargetId, newTargetId, newNodeIn }) {
    let link = state.statusFlow.statuses
      .find(status => {
        return status.id === originId;
      })
      .link.find(link => {
        return link.targetId === oldTargetId;
      });
    link.in.socket = newNodeIn;
    link.node.in = newNodeIn;
    link.targetId = newTargetId;
  },
  SET_DRAG_PAYLOAD(state, { originId, targetId, position, nodeIn, restoring }) {
    state.dragPayload.originId = originId;
    state.dragPayload.targetId = targetId;
    state.dragPayload.nodeIn = nodeIn;
    state.dragPayload.position = position;
    state.dragPayload.restoring = restoring;
  },
  SET_VIEWPORT_OFFSET(state, { x, y }) {
    state.config.viewportOffset.x = x;
    state.config.viewportOffset.y = y;
  },
  ADD_LINK(state, { originId, targetId, nodeOut, position }) {
    state.statusFlow.statuses
      .find(status => {
        return status.id === originId;
      })
      .link.push({
        targetId: targetId,
        node: { out: nodeOut, in: 0 },
        in: { position: position, socket: 0 }
      });
  },
  REMOVE_LINK(state, { originId, targetId }) {
    let links = state.statusFlow.statuses.find(status => {
      return status.id === originId;
    }).link;
    let indexToRemove = links.findIndex(link => {
      return link.targetId === targetId;
    });
    links.splice(indexToRemove, 1);
  },
  EDIT_VIEWPORT(state, viewport) {
    for (let prop in viewport) {
      state.viewport[prop] = viewport[prop];
    }
  }
};
export const actions = {
  dragStatus({ commit }, { statusId, position }) {
    commit("CHANGE_POSITION", { statusId, position });
  },
  dragView({ commit }, position) {
    commit("MOVE_VIEW", { position });
  },
  findStatusByTarget({ state }, targetId) {
    return state.statusFlow.statuses.find(status => {
      return status.link.find(link => {
        return link.targetId === targetId;
      });
    });
  },
  setWidth({ commit }, { statusId, width }) {
    commit("SET_WIDTH", { statusId, width });
  },
  plugin({ commit }, { originId, oldTargetId, newTargetId, newNodeIn }) {
    commit("PLUGIN", { originId, oldTargetId, newTargetId, newNodeIn });
  },
  setTargetLinkPosition({ commit }, { originId, targetId, nodeIn, position }) {
    commit("SET_TARGET_LINK_POSITION", {
      originId,
      targetId,
      nodeIn,
      position
    });
  },
  setDragPayload(
    { commit },
    { originId, targetId, position, nodeIn, restoring = null }
  ) {
    commit("SET_DRAG_PAYLOAD", {
      originId,
      targetId,
      position,
      nodeIn,
      restoring
    });
  },
  setViewportOffset({ commit }, { x, y }) {
    commit("SET_VIEWPORT_OFFSET", { x, y });
  },
  addLink({ commit }, { originId, targetId, nodeOut, position }) {
    commit("ADD_LINK", { originId, targetId, nodeOut, position });
  },
  removeLink({ commit }, { originId, targetId }) {
    commit("REMOVE_LINK", { originId, targetId });
  },
  editViewport({ commit }, viewport) {
    commit("EDIT_VIEWPORT", viewport);
  }
};
