import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { auth } from "./auth";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "cafs-front",
});

const modules = { auth };

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin],
});
