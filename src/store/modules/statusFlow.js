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
    gap: 11,
    margin: 7,
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
  SET_DIMENSION(state, { statusId, width, height }) {
    let status = state.statusFlow.statuses.find(status => {
      return status.id === statusId;
    });
    status.width = width;
    status.height = height;
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
  ADD_LINK(state, { originId, targetId, outSocket }) {
    state.statusFlow.statuses
      .find(status => {
        return status.id === originId;
      })
      .link.push({
        targetId: targetId,
        node: { out: outSocket, in: 0 },
        in: { socket: 0 },
        out: { socket: outSocket }
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
  ADD_STATUS(state, { id, title, position }) {
    state.statusFlow.statuses.push({ id, title, position, link: [] });
  },
  REMOVE_STATUS(state, originId) {
    let indexToRemove = state.statusFlow.statuses.findIndex(status => {
      return status.id === originId;
    });
    state.statusFlow.statuses.splice(indexToRemove, 1);
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
  setDimension({ commit }, { statusId, width, height }) {
    commit("SET_DIMENSION", { statusId, width, height });
  },
  plugin({ commit }, { originId, oldTargetId, newTargetId, newNodeIn }) {
    commit("PLUGIN", { originId, oldTargetId, newTargetId, newNodeIn });
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
  addLink({ commit }, { originId, targetId, outSocket }) {
    commit("ADD_LINK", { originId, targetId, outSocket });
  },
  removeLink({ commit }, { originId, targetId }) {
    commit("REMOVE_LINK", { originId, targetId });
  },
  addStatus({ commit, state }, { title, position }) {
    let id =
      Math.max(...state.statusFlow.statuses.map(status => status.id)) + 1;
    commit("ADD_STATUS", { id, title, position });
  },
  removeStatus({ commit, state }, originId) {
    let statusesWithTarget = state.statusFlow.statuses.filter(status => {
      return status.link.find(link => {
        return link.targetId === originId;
      });
    });

    for (let target of statusesWithTarget) {
      commit("REMOVE_LINK", { originId: target.id, targetId: originId });
    }
    commit("REMOVE_STATUS", originId);
  },
  editViewport({ commit }, viewport) {
    commit("EDIT_VIEWPORT", viewport);
  }
};
