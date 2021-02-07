import Vue from "vue";
import Vuex from "vuex";
import * as board from "@/store/modules/board";
import * as flow from "@/store/modules/statusFlow";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { board, flow }
});
