import axios from "axios";
import authService from "@/api/auth";

export const auth = {
  namespaced: true,
  state: () => ({
    loggedIn: false,
    user: {},
    token: "",
  }),
  mutations: {
    setToken(state, userToken) {
      state.token = userToken.access_token;
      state.loggedIn = true;
    },
    setLoginInfo(state, userForm) {
      state.user = userForm;
    },
    setHeaders(state) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      axios.defaults.headers.get["Authorization"] = `Bearer ${state.token}`;
      axios.defaults.headers.post["Authorization"] = `Bearer ${state.token}`;
      axios.defaults.headers.patch["Authorization"] = `Bearer ${state.token}`;
    },
    unsetHeaders() {
      delete axios.defaults.headers.common["Authorization"];
      delete axios.defaults.headers.get["Authorization"];
      delete axios.defaults.headers.post["Authorization"];
      delete axios.defaults.headers.patch["Authorization"];
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
  actions: {
    async get({ commit }) {
      const userForm = await authService.get();
      commit("setLoginInfo", userForm);
    },
    async register({ dispatch, commit }, userForm) {
      try {
        const userToken = await authService.register(userForm);
        commit("setToken", userToken);
        commit("setHeaders");
        dispatch("get");
        return Promise.resolve(userToken);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async login({ dispatch, commit }, userForm) {
      try {
        const userToken = await authService.login(userForm);
        commit("setToken", userToken);
        commit("setHeaders");
        dispatch("get");
        return Promise.resolve(userToken);
      } catch (e) {
        commit("setLogout");
        return Promise.reject(e);
      }
    },
    async logout({ commit }) {
      await authService.logout();
      commit("unsetHeaders");
      commit("setLogout");
      location.reload();
    },
    async update({ dispatch }, newUser) {
      try {
        await authService.update(newUser);
        dispatch("get");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
