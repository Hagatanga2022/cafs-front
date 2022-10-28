import announcementService from "@/api/announcement";

export const announcement = {
  namespaced: true,
  state: () => ({
    allAnnounces: [],
    announce: {},
  }),
  mutations: {
    setAnnounces(state, announces) {
      state.allAnnounces = announces;
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
    async editAnnouncement({ dispatch, state }, idAnnounce) {
      try {
        await announcementService.update(idAnnounce, state.announce);
        dispatch("getAnnouncement");
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async deleteAnnouncement({ dispatch }, idAnnounce) {
      try {
        await announcementService.delete(idAnnounce);
        dispatch("getAnnouncement");
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
