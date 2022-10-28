import axios from "axios";
import authService from "@/api/auth";

export const auth = {
  namespaced: true,
  state: () => ({
    loggedIn: false,
    user: null,
    token: null,
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
    },
    unsetHeaders() {
      delete axios.defaults.headers.common["Authorization"];
    },
    setLogout(state) {
      state.user = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
  actions: {
    async getUser({ commit }) {
      const userForm = await authService.read();
      commit("setLoginInfo", userForm);
    },
    async register({ dispatch, commit }, userForm) {
      try {
        const userToken = await authService.create(userForm);
        commit("setToken", userToken);
        commit("setHeaders");
        dispatch("getUser");
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
        dispatch("getUser");
        return Promise.resolve(userToken);
      } catch (e) {
        commit("setLogout");
        return Promise.reject(e);
      }
    },
    async logout({ commit }) {
      await authService.logout();
      commit("setLogout");
      location.reload();
    },
    async updateUser({ dispatch }, newUser) {
      try {
        await authService.update(newUser);
        dispatch("getUser");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteUser({ dispatch }, idUser) {
      try {
        await authService.delete(idUser);
        dispatch("getUser");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
