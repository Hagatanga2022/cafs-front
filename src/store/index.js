import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { auth } from "./auth";
import { announcement } from "./announcement";
import { comment } from "./comment";
import { computer } from "./computer";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "cafs-front",
});

const modules = {
  auth,
  announcement,
  comment,
  computer,
};

export default new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin],
});
