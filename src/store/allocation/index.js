import allocationService from "@/api/allocation";

export const allocation = {
  namespaced: true,
  state: () => ({
    allAllocation: [],
    allocation: {},
  }),
  mutations: {
    setAllocations(state, allocations) {
      state.allAllocation = allocations;
    },
    cleanAllocation(state) {
      state.allocation = {};
    },
    cleanAllocations(state) {
      state.allAllocation = [];
      state.allocation = {};
    },
  },
  actions: {
    async getAllocations({ commit }) {
      const allocations = await allocationService.read();
      commit("setAllocations", allocations);
    },
    async postAllocation({ dispatch, state }) {
      try {
        await allocationService.create(state.allocation);
        dispatch("getAllocations");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async editAllocation({ dispatch, state }, allocationID) {
      try {
        await allocationService.update(allocationID, state.allocation);
        dispatch("getAllocations");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteAllocation({ dispatch }, allocationID) {
      try {
        await allocationService.delete(allocationID);
        dispatch("getAllocations");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
