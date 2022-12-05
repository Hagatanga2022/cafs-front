import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { auth } from "./auth";
import { announcement } from "./announcement";
import { comment } from "./comment";
import { computer } from "./computer";

Vue.use(Vuex);

const modules = {
  auth,
  announcement,
  comment,
  computer,
};

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: "cafs-front",
    }),
  ],
});
