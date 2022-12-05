import computerService from "@/api/computer";

export const computer = {
  namespaced: true,
  state: () => ({
    allComputers: [],
    computer: {},
  }),
  mutations: {
    setComputer(state, computers) {
      state.allComputers = computers;
    },
    cleanComputer(state) {
      state.computer = {};
    },
    cleanComputers(state) {
      state.allComputers = [];
      state.computer = {};
    },
  },
  actions: {
    async getComputer({ commit }) {
      const computers = await computerService.read();
      commit("setComputer", computers);
    },
    async postComputer({ dispatch, state }) {
      try {
        await computerService.create(state.computer);
        dispatch("getComputer");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async editComputer({ dispatch, state }, computerID) {
      try {
        await computerService.update(computerID, state.computer);
        dispatch("getComputer");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteComputer({ dispatch }, computerID) {
      try {
        await computerService.delete(computerID);
        dispatch("getComputer");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
