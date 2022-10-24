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
    setLogout(state) {
      Object.keys(state.user).forEach((key) => delete state.user[key]);
      state.token = "";
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
        dispatch("get");
        return Promise.resolve(userToken);
      } catch (e) {
        commit("setLogout");
        return Promise.reject(e);
      }
    },
    async logout({ commit }) {
      await authService.logout();
      commit("setLogout");
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
