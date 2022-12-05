import announcementService from "@/api/announcement";

export const announcement = {
  namespaced: true,
  state: () => ({
    allAnnounces: [],
    announce: {},
  }),
  mutations: {
    setAnnounces(state, announces) {
      state.allAnnounces = announces.reverse();
    },
    cleanAnnounce(state) {
      state.announce = {};
    },
    cleanAnnouncement(state) {
      state.allAnnounces = [];
      state.announce = {};
    },
  },
  actions: {
    async getAnnouncement({ commit }) {
      const announces = await announcementService.read();
      commit("setAnnounces", announces);
    },
    async postAnnouncement({ dispatch, state }) {
      try {
        await announcementService.create(state.announce);
        dispatch("getAnnouncement");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async editAnnouncement({ dispatch, state }, announceID) {
      try {
        await announcementService.update(announceID, state.announce);
        dispatch("getAnnouncement");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteAnnouncement({ dispatch }, announceID) {
      try {
        await announcementService.delete(announceID);
        dispatch("getAnnouncement");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
