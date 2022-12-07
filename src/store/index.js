import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { auth } from "./auth";
import { comment } from "./comment";
import { computer } from "./computer";
import { allocation } from "./allocation";
import { announcement } from "./announcement";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "cafs-front",
});

const modules = {
  auth,
  comment,
  computer,
  allocation,
  announcement,
};

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin],
});
