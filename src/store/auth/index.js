import AuthService from "@/api/auth";

export const auth = {
  namespaced: true,
  state: () => ({
    loggedIn: false,
    user: {},
  }),
  mutations: {
    setLoginInfo(state, user) {
      state.user = user;
      state.loggedIN = true;
    },
    setLogout(state) {
      state.user = {};
      state.loggedIN = false;
    },
  },
  actions: {
    async login({ commit }, user) {
      try {
        console.log("Passou por aqui pelo menos")
        const userInfo = await AuthService.login(user)
        console.log("UserInfo", userInfo)
        commit("setLoginInfo", userInfo);
        return Promise.resolve(userInfo)
      } catch(e) {
        commit("setLogout");
        return Promise.reject(e)
      }
    },
    logout({ commit }) {
      commit("setLogout");
    },
  },
};
