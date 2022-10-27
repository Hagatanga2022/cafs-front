import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { auth } from "./auth";

Vue.use(Vuex);

const modules = { auth };

export default new Vuex.Store({
  modules,
  plugins: [createPersistedState({
    storage: window.localStorage,
    key: "cafs-front",
  })],
});
